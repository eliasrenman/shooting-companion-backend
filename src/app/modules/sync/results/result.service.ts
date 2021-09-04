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


  public async pullCreated(timestamp: number, user: string): Promise<SyncEvent<Result[]>> {
    const data = (await this.fetchAfterCreatedAt(timestamp, user));
    
    return {
      event: RESULT_PULL_UPDATED,
      type: 'created',
      data
    }
  }

  public async pullUpdated(timestamp: number, user: string): Promise<SyncEvent<Result[]>> {
    const data = (await this.fetchAfterUpdatedAt(timestamp, user))?.filter((item: Result) => new Date(item?.updatedAt)?.getTime() !== new Date(item?.createdAt).getTime());
    
    
    return {
      event: RESULT_PULL_UPDATED,
      type: 'updated',
      data
    }
  }

  private async fetchAfterUpdatedAt(timestamp: number, user: string, deleted = false): Promise<ResultDocument[]> {
    // @ts-ignore
    return this.resultModel.find({ updatedAt: { $gte: timestamp }, deleted, user });
  }

  private async fetchAfterCreatedAt(timestamp: number, user: string, deleted = false): Promise<ResultDocument[]> {
    // @ts-ignore
    return this.resultModel.find({ createdAt: { $gte: timestamp }, deleted, user });
  }


  public async pullDeleted(timestamp: number, user: string): Promise<SyncEvent<string[]>> {
    const data = (await this.fetchAfterUpdatedAt(timestamp, user, true))?.map(item => item?._id)

    return {
      event: RESULT_PULL_UPDATED,
      type: 'deleted',
      data
    }
  }



  public async pushCreated(changes: Result[], timestamp: number, user: string): Promise<void> {
    await this.resultModel.insertMany(changes?.map(item => ({...item, user})));
  }

  public async pushUpdated(changes: Result[], timestamp: number, user: string): Promise<void> {
    await this.resultModel.bulkWrite(changes?.map(item => ({
      updateOne: {
        filter: { _id: item._id, user },
        update: item
      }
    })))
  }

  public async pushDeleted(changes: string[], timestamp: number, user: string): Promise<void> {
    await this.resultModel.updateMany({ _id: { $in: changes }, user }, { deleted: true, deletedAt: new Date() })
  }
}
