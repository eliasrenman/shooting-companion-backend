
import { RecordSync } from '@app/modules/sync/interface/record-sync';
import { Report, ReportDocument } from '@app/modules/sync/reports/report.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class ReportService extends RecordSync<ReportDocument, Report> {

  constructor(@InjectModel(Report.name) private readonly reportModel: Model<ReportDocument>) {
    super(reportModel);
  }



}
