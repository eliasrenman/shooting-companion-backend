import { RESULT } from './results/result.const';
import { SyncPullResult, Changes, SyncTableChangeSet } from '@app/modules/sync/interface/sync-pull-result';
import { Sync, SyncPullOptions } from '@app/modules/sync/interface/sync.interface';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {find} from 'lodash';
import { Result } from '@app/modules/sync/results/result.model';

@Injectable()
export class SyncService implements Sync {

  private readonly models = [
    RESULT,
  ];

  constructor(private eventEmitter: EventEmitter2) { }

  public async pull(options: SyncPullOptions): Promise<SyncPullResult> {
    return {
      changes: await this.pullModels(options.timestamp, options.user),
      timestamp: new Date()?.getTime(),
    }
  }

  private async pullModels(timestamp: number, user: string): Promise<Changes> {
    let changes: Changes = {};

    for (const model of this.models) {
      changes[model] = await this.pullModel(timestamp, model, user);
    }
    return changes;
  }

  private async pullModel<T>(timestamp: number, model: string, user: string): Promise<SyncTableChangeSet<T>> {

    const result = await this.eventEmitter.emitAsync(`${model}.pull.*`, {
      timestamp,
      user
    })
    return {
      created: find(result, item => item?.type === 'created')?.data || [],
      updated: find(result, item => item?.type === 'updated')?.data || [],
      deleted: find(result, item => item?.type === 'deleted')?.data || [],
    }
  }

  public async push(changes: Changes, timestamp: number, user: string): Promise<void> {
    await this.pushModels(changes, timestamp, user);
  }

  private async pushModels(changes: Record<string, SyncTableChangeSet<Result>>, timestamp: number, user: string) {
    for (const [key, value] of Object.entries(changes)) {
      
      await this.eventEmitter.emitAsync(`${key}.push.*`, {
        timestamp,
        changes: value,
        user
      })
    }
  }

}
