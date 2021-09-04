

export class SyncPullResult {
  changes!: Changes;
  timestamp!: number;
}

export class Changes {
  [table: string]: SyncTableChangeSet<any>;
}

export class SyncTableChangeSet<T extends Record<any, any>> {

  public created!: T[];
  public updated!: T[];
  public deleted!: string[];
}
// export type SyncPullResult = { changes: SyncDatabaseChangeSet, timestamp: Timestamp }