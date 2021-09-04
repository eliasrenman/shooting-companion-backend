import { SyncEvent } from '@app/modules/sync/interface/sync.interface';

export interface RecordSync<T extends any> {
  pullCreated(timestamp: number): Promise<SyncEvent<T[]>>
  pullUpdated(timestamp: number): Promise<SyncEvent<T[]>>
  pullDeleted(timestamp: number): Promise<SyncEvent<string[]>>
  
  pushCreated(changes: T[],timestamp: number): Promise<void>
  pushUpdated(changes: T[],timestamp: number): Promise<void>
  pushDeleted(changes: string[],timestamp: number): Promise<void>
}