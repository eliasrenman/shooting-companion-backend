import { SyncPullResult } from '@app/modules/sync/interface/sync-pull-result';
import { SyncService } from '@app/modules/sync/sync.service';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';

@Controller('sync')
export class SyncController {

  constructor(private service: SyncService) { }

  @Get('pull')
  async pullChanges(@Query('lastPulledAt') lastPulledAt: number): Promise<SyncPullResult> {
    return this.service.pull({ timestamp: lastPulledAt });
  }

  @Post('push')
  async pushCHanges(@Body() {changes, lastPulledAt}: any) {
    return this.service.push(changes, lastPulledAt);
  }
}
