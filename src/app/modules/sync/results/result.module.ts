import { ResultListener } from '@app/modules/sync/results/result.listener';
import { Result, ResultSchema } from '@app/modules/sync/results/result.model';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResultService } from './result.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Result.name, schema: ResultSchema }]),
  ],
  providers: [ResultService, ResultListener]
})
export class ResultModule {}
