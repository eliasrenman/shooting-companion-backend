import { SyncTableChangeSet } from '@app/modules/sync/interface/sync-pull-result';
import { Report } from '@app/modules/sync/reports/report.model';
import { REPORT_PULL_CREATED, REPORT_PULL_DELETED, REPORT_PULL_UPDATED, REPORT_PUSH_CREATED, REPORT_PUSH_DELETED, REPORT_PUSH_UPDATED } from '@app/modules/sync/reports/reports.const';
import { ReportService } from '@app/modules/sync/reports/result.service';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

type ReportEvent = {
  changes: SyncTableChangeSet<Report>,
  timestamp: number;
  user: string;
};
type Pull = {
  timestamp: number;
  user: string;
}
@Injectable()
export class ReportListener {

  constructor(private reportService: ReportService) { }


  @OnEvent(REPORT_PULL_CREATED, { async: true, promisify: true })
  public async pullCreated(data: Pull) {
    return this.reportService.pullCreated(data.timestamp, data.user);
  }

  @OnEvent(REPORT_PULL_UPDATED, { async: true, promisify: true })
  public async pullUpdated(data: Pull) {
    return this.reportService.pullUpdated(data.timestamp, data.user);
  }

  @OnEvent(REPORT_PULL_DELETED, { async: true, promisify: true })
  public async pullDeleted(data: Pull) {
    return this.reportService.pullDeleted(data.timestamp, data.user);
  }

  @OnEvent(REPORT_PUSH_CREATED, { async: true, promisify: true })
  public async pushCreated({ changes, timestamp, user }: ReportEvent) {
    return this.reportService.pushCreated(changes?.created, timestamp, user);
  }

  @OnEvent(REPORT_PUSH_UPDATED, { async: true, promisify: true })
  public async pushUpdated({ changes, timestamp, user }: ReportEvent) {
    return this.reportService.pushUpdated(changes?.updated, timestamp, user);
  }

  @OnEvent(REPORT_PUSH_DELETED, { async: true, promisify: true })
  public async pushDeleted({ changes, timestamp, user }: ReportEvent) {
    return this.reportService.pushDeleted(changes?.deleted, timestamp, user);
  }
}