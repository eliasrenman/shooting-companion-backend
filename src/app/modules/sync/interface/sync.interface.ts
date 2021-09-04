import { Changes, SyncPullResult, SyncTableChangeSet } from '@app/modules/sync/interface/sync-pull-result';

export type SyncPullOptions = {
  /**
   * timestamp in ms
   */
  timestamp: number
}

export interface Sync {
  pull(options: SyncPullOptions): Promise<SyncPullResult>;
  push(changes: Changes, timestamp: number): Promise<void>;
}

export class SyncEvent<T extends any> {

  public event!: string;

  public type!: 'created' | 'updated' | 'deleted';

  public data!: T;
}