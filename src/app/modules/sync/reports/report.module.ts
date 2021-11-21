
import { ReportListener } from '@app/modules/sync/reports/report.listener';
import { Report, ReportSchema } from '@app/modules/sync/reports/report.model';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportService } from './result.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Report.name, schema: ReportSchema }]),
  ],
  providers: [ReportService, ReportListener]
})
export class ReportModule { }
