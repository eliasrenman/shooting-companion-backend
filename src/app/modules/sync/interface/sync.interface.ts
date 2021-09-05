import { Changes, SyncPullResult, SyncTableChangeSet } from '@app/modules/sync/interface/sync-pull-result';

export type SyncPullOptions = {
  /**
   * timestamp in ms
   */
  timestamp: number

  user: string;
}

export interface Sync {
  pull(options: SyncPullOptions): Promise<SyncPullResult>;
  push(changes: Changes, timestamp: number, user: string): Promise<void>;
}

export class SyncEvent<T extends any> {

  public type!: 'created' | 'updated' | 'deleted';

  public data!: T;
}