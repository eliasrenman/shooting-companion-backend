import { SyncTableChangeSet } from '@app/modules/sync/interface/sync-pull-result';
import { RESULT_PULL_CREATED, RESULT_PULL_DELETED, RESULT_PULL_UPDATED, RESULT_PUSH_CREATED, RESULT_PUSH_DELETED, RESULT_PUSH_UPDATED } from '@app/modules/sync/results/result.const';
import { Result } from '@app/modules/sync/results/result.model';
import { ResultService } from '@app/modules/sync/results/result.service';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

type ResultEvent = {
  changes: SyncTableChangeSet<Result>,
  timestamp: number
};

@Injectable()
export class ResultListener {

  constructor(private resultService: ResultService) { }

  
  @OnEvent(RESULT_PULL_CREATED, { async: true, promisify: true })
  public async pullCreated({timestamp}: {timestamp: number}) {
    return this.resultService.pullCreated(timestamp);
  }
  
  @OnEvent(RESULT_PULL_UPDATED, { async: true, promisify: true })
  public async pullUpdated({timestamp}: {timestamp: number}) {
    return this.resultService.pullUpdated(timestamp);
  }
  
  @OnEvent(RESULT_PULL_DELETED, { async: true, promisify: true })
  public async pullDeleted({timestamp}: {timestamp: number}) {
    return this.resultService.pullDeleted(timestamp);
  }
  
  @OnEvent(RESULT_PUSH_CREATED, { async: true, promisify: true })
  public async pushCreated({changes, timestamp}: ResultEvent) {
    return this.resultService.pushCreated(changes?.created, timestamp);
  }
  
  @OnEvent(RESULT_PUSH_UPDATED, { async: true, promisify: true })
  public async pushUpdated({changes, timestamp}: ResultEvent) {
    return this.resultService.pushUpdated(changes?.updated, timestamp);
  }
  
  @OnEvent(RESULT_PUSH_DELETED, { async: true, promisify: true })
  public async pushDeleted({changes, timestamp}: ResultEvent) {
    return this.resultService.pushDeleted(changes?.deleted, timestamp);
  }
}