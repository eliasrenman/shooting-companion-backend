import { Module } from '@nestjs/common';
import { SyncController } from './sync.controller';
import { SyncService } from './sync.service';
import { ResultModule } from './results/result.module';

@Module({
  controllers: [SyncController],
  providers: [SyncService],
  imports: [ResultModule]
})
export class SyncModule {}
