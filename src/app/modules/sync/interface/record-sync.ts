import { SyncEvent } from '@app/modules/sync/interface/sync.interface';
import { Document, Model } from 'mongoose';
import { RecordSyncI } from './record-sync.interface'

export class RecordSync<T extends Document, M extends Record<any,any>> implements RecordSyncI<M> {

  constructor(readonly model: Model<T>) {}
  public async pullCreated(timestamp: number, user: string): Promise<SyncEvent<M[]>> {
    const data = (await this.fetchAfterCreatedAt(timestamp, user)) as M[];
    
    return {
      type: 'created',
      data
    }
  }

  public async pullUpdated(timestamp: number, user: string): Promise<SyncEvent<M[]>> {
    // Filter out created events
    const data = (await this.fetchAfterUpdatedAt(timestamp, user))
    // @ts-ignore
    ?.filter((item: M) => new Date(item?.updatedAt)?.getTime() !== new Date(item?.createdAt).getTime()) as M[];
    
    
    return {
      type: 'updated',
      data
    }
  }

  private async fetchAfterUpdatedAt(timestamp: number, user: string, deleted = false): Promise<T[]> {
    // @ts-ignore
    return this.model.find({ createdAt: { $lte: timestamp }, updatedAt: { $gte: timestamp }, deleted, user });
  }

  private async fetchAfterCreatedAt(timestamp: number, user: string, deleted = false): Promise<T[]> {
    // @ts-ignore
    return this.model.find({ createdAt: { $gte: timestamp }, deleted, user });
  }

  private async fetchDeleted(timestamp: number, user: string): Promise<T[]> {
    // @ts-ignore
    return this.model.find({ updatedAt: { $gte: timestamp }, deleted: true, user });
  }

  public async pullDeleted(timestamp: number, user: string): Promise<SyncEvent<string[]>> {
    const data = (await this.fetchDeleted(timestamp, user))?.map(item => item?._id)

    return {
      type: 'deleted',
      data
    }
  }



  public async pushCreated(changes: M[], timestamp: number, user: string): Promise<void> {
    await this.model.insertMany(changes?.map(item => ({...item, user})));
  }

  public async pushUpdated(changes: M[], timestamp: number, user: string): Promise<void> {
    await this.model.bulkWrite(changes?.map(item => ({
      updateOne: {
        filter: { _id: item._id, user },
        update: item
      }
    })))
  }

  public async pushDeleted(changes: string[], timestamp: number, user: string): Promise<void> {
    // @ts-ignore
    await this.model.updateMany({ _id: { $in: changes }, user }, { deleted: true, deletedAt: new Date() })
  }

}