import { RECORD_PING } from '@app/modules/sync/record/record.const';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class RecordListener {
  @OnEvent(RECORD_PING, { async: true, promisify: true })
  private async ping(event: any) {
    // handle and process "OrderCreatedEvent" event
    console.log(event);
    return 'PONG';
  }
}