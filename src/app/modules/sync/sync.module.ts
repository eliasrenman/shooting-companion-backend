import { Module } from '@nestjs/common';
import { SyncController } from './sync.controller';
import { SyncService } from './sync.service';
import { RecordModule } from './record/record.module';

@Module({
  controllers: [SyncController],
  providers: [SyncService],
  imports: [RecordModule]
})
export class SyncModule {}
