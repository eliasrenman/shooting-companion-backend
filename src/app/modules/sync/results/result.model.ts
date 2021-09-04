import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Model, MS_DATE } from '@src/shared/database/mongo/model/base.model';
import { Document, Schema as MSchema } from 'mongoose';

export type ResultDocument = Result & Document;

@Schema({
  timestamps: true,
  toObject: { virtuals: true, getters: true },
  toJSON: { virtuals: true, getters: true }
})
export class Result extends Model {

  @ApiProperty()
  @Prop({ 
    required: true,
    get: MS_DATE
  })
  public date!: Date;

  @ApiProperty()
  @Prop({ required: true, index: 1 })
  public disciplin!: string;

  @ApiProperty()
  @Prop({ required: true, index: 1 })
  public branch!: string;

  @ApiPropertyOptional()
  @Prop({ required: false })
  public refundable?: boolean;

  @ApiPropertyOptional()
  @Prop({ required: false })
  public refunded?: boolean;

  @ApiPropertyOptional()
  @Prop({ required: false })
  public competition?: boolean;

  @ApiPropertyOptional()
  @Prop({ required: false })
  public notes?: string;

  @ApiPropertyOptional()
  @Prop({ required: false, type: MSchema.Types.Mixed })
  public round_count?: Record<string, any>;

  @ApiPropertyOptional()
  @Prop({ required: false, type: MSchema.Types.Mixed })
  public result?: Record<string, any>;

  @ApiProperty()
  @Prop({ required: false, immutable: true })
  public user!: string;

}

const _resultSchema = SchemaFactory.createForClass(Result);

_resultSchema.index({ updatedAt: 1, createdAt: 1 });

export const ResultSchema = _resultSchema;