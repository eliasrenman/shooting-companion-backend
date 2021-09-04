import { Auth } from '@app/modules/auth/jwt-auth-guard.decorator';
import { SyncPullResult } from '@app/modules/sync/interface/sync-pull-result';
import { SyncService } from '@app/modules/sync/sync.service';
import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express-serve-static-core';

@Controller('sync')
@Auth()
export class SyncController {

  constructor(private service: SyncService) { }

  @Get('pull')
  async pullChanges(@Query('lastPulledAt') lastPulledAt: number, @Req() req: Request): Promise<SyncPullResult> {

    return this.service.pull({ timestamp: lastPulledAt, user: (req.user as any)?.userId!});
  }

  @Post('push')
  async pushCHanges(@Body() {changes, lastPulledAt}: any, @Req() req: Request) {
    
    return this.service.push(changes, lastPulledAt, (req.user as any)?.userId!!);
  }
}
