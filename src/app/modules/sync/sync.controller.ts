import { RECORD, RECORD_PING } from './record/record.const';
import { Controller, Get } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller('sync')
export class SyncController {

  constructor(private eventEmitter: EventEmitter2) {}

  @Get('ping')
  async ping() {
    return this.eventEmitter.emitAsync(RECORD, 'ping')
  }
}
