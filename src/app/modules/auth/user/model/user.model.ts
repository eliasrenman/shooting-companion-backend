import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from '@nestjs/swagger';
import { Model } from '../../../../../shared/database/mongo/model/base.model';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: true
})
export class User extends Model {
  
 
  @ApiProperty()
  @Prop({
    required: true
  })
  name!: string;
  
  @ApiProperty()
  @Prop({
    required: true
  })
  imageUrl!: string;
  
}

export const UserSchema = SchemaFactory.createForClass(User);