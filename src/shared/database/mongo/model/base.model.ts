import { Prop, Schema } from "@nestjs/mongoose";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { v4 } from "uuid";


@Schema({
  timestamps: true
})
export abstract class Model {
  @Prop({
    default: () => v4()
  })
  @ApiProperty({
    example: v4()
  })
  _id?: string;

  @ApiPropertyOptional({
    type: Date,
    example: new Date()
  })
  createdAt?: Date

  @ApiPropertyOptional({
    type: Date,
    example: new Date()
  })
  updatedAt?: boolean;

}