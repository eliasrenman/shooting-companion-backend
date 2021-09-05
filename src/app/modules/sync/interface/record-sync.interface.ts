import { SyncEvent } from '@app/modules/sync/interface/sync.interface';

export interface RecordSyncI<T extends any> {
  pullCreated(timestamp: number, user: string): Promise<SyncEvent<T[]>>
  pullUpdated(timestamp: number, user: string): Promise<SyncEvent<T[]>>
  pullDeleted(timestamp: number, user: string): Promise<SyncEvent<string[]>>
  
  pushCreated(changes: T[],timestamp: number, user: string): Promise<void>
  pushUpdated(changes: T[],timestamp: number, user: string): Promise<void>
  pushDeleted(changes: string[],timestamp: number, user: string): Promise<void>
}