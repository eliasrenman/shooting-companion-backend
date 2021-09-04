import { Prop, Schema } from "@nestjs/mongoose";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { nanoid } from 'nanoid';

export const MS_DATE = (val: Date) => val?.getTime();

@Schema({
  timestamps: true,
  toObject: { virtuals: true, getters: true },
  toJSON: { virtuals: true, getters: true }
})
export abstract class Model {
  @Prop({
    default: () => nanoid(),
  })
  @ApiProperty({
    example: nanoid()
  })
  _id?: string;
  
  @ApiProperty({
    example: nanoid()
  })
  id?: string;

  @ApiPropertyOptional({
    type: Date,
    example: new Date(),
  })
  @Prop({
    get: MS_DATE
  })
  createdAt!: Date

  @ApiPropertyOptional({
    type: Date,
    example: new Date()
  })
  @Prop({
    get: MS_DATE
  })
  updatedAt!: Date;
  
  @ApiPropertyOptional({
    type: Boolean,
    example: false
  })
  @Prop({
    default: false,
  })
  deleted!: boolean;
  
  @ApiPropertyOptional({
    type: Date,
    example: new Date(),
    
  })
  @Prop({
    get: MS_DATE
  })
  deletedAt!: Date;

}

