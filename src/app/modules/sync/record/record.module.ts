import { RecordListener } from '@app/modules/sync/record/record.listener';
import { Module } from '@nestjs/common';
import { RecordService } from './record.service';

@Module({
  providers: [RecordService, RecordListener]
})
export class RecordModule {}
