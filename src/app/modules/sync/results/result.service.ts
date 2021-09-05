
import { RecordSync } from '@app/modules/sync/interface/record-sync';
import { SyncEvent } from '@app/modules/sync/interface/sync.interface';
import { Result, ResultDocument, } from '@app/modules/sync/results/result.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RESULT_PULL_UPDATED } from './result.const';


@Injectable()
export class ResultService extends RecordSync<ResultDocument, Result> {

  constructor(@InjectModel(Result.name) private readonly resultModel: Model<ResultDocument>) { 
    super(resultModel);
  }


  
}
