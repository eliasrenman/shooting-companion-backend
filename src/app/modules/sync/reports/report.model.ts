import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Model, MS_DATE } from '@src/shared/database/mongo/model/base.model';
import { Document } from 'mongoose';

export type ReportDocument = Report & Document;

@Schema({
  timestamps: true,
  toObject: { virtuals: true, getters: true },
  toJSON: { virtuals: true, getters: true }
})
export class Report extends Model {

  @ApiProperty()
  @Prop({
    required: true,
    get: MS_DATE
  })
  public startDate!: Date;

  @ApiProperty()
  @Prop({
    required: true,
    get: MS_DATE
  })
  public endDate!: Date;

  @ApiProperty()
  @Prop({ required: true, })
  public branch!: string[];

  @ApiPropertyOptional()
  @Prop({ required: false })
  public refunded?: boolean;

  @ApiProperty()
  @Prop({ required: false, immutable: true })
  public user!: string;

}

const _reportSchema = SchemaFactory.createForClass(Report);

_reportSchema.index({ updatedAt: 1, createdAt: 1 });

export const ReportSchema = _reportSchema;