import { RecordSync } from '@app/modules/sync/interface/record-sync.interface';
import { SyncEvent } from '@app/modules/sync/interface/sync.interface';
import { Result, ResultDocument } from '@app/modules/sync/results/result.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RESULT_PULL_UPDATED } from './result.const';


@Injectable()
export class ResultService implements RecordSync<Result> {

  constructor(@InjectModel(Result.name) private readonly resultModel: Model<ResultDocument>) { }


  public async pullCreated(timestamp: number): Promise<SyncEvent<Result[]>> {
    const data = (await this.fetchAfterTimestamp(timestamp))?.filter((item: Result) => new Date(item?.updatedAt)?.getTime() === new Date(item?.createdAt).getTime());
    
    return {
      event: RESULT_PULL_UPDATED,
      type: 'created',
      data
    }
  }

  public async pullUpdated(timestamp: number): Promise<SyncEvent<Result[]>> {
    const data = (await this.fetchAfterTimestamp(timestamp))?.filter((item: Result) => new Date(item?.updatedAt)?.getTime() !== new Date(item?.createdAt).getTime());
    
    
    return {
      event: RESULT_PULL_UPDATED,
      type: 'updated',
      data
    }
  }

  private async fetchAfterTimestamp(timestamp: number, deleted = false): Promise<ResultDocument[]> {
    // @ts-ignore
    const rsult = await this.resultModel.find({ updatedAt: { $gte: timestamp }, deleted });
      
    return rsult;
  }


  public async pullDeleted(timestamp: number): Promise<SyncEvent<string[]>> {
    const data = (await this.fetchAfterTimestamp(timestamp, true))?.map(item => item?._id)

    return {
      event: RESULT_PULL_UPDATED,
      type: 'deleted',
      data
    }
  }



  public async pushCreated(changes: Result[], timestamp: number): Promise<void> {
    
    const result = await this.resultModel.insertMany(changes);

    console.log("Push created", changes, result);
  }

  public async pushUpdated(changes: Result[], timestamp: number): Promise<void> {
    console.log("Push updated", changes,);
    await this.resultModel.bulkWrite(changes?.map(item => ({
      updateOne: {
        filter: { _id: item._id },
        update: item
      }
    })))
  }

  public async pushDeleted(changes: string[], timestamp: number): Promise<void> {
    console.log("Push deleted", changes,);
    await this.resultModel.updateMany({ _id: { $in: changes } }, { deleted: true, deletedAt: new Date() })
  }
}
