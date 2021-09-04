import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty, ApiPropertyOptional, ApiHideProperty } from '@nestjs/swagger';
import { v1 } from "uuid";
import { Model } from '../../../../shared/database/mongo/model/base.model';
import { User } from '../user/model/user.model';
import { Document } from 'mongoose';


export type AuthProviderDocument = AuthProvider & Document;

@Schema({
  timestamps: true
})
export class AuthProvider extends Model {

  @ApiProperty()
  @Prop({
    index: true,
    required: true
  })
  primaryKey?: string;

  @ApiHideProperty()
  @Prop()
  latestAccessToken?: string;

  @ApiProperty()
  @Prop({
    required: true
  })
  provider!: string;

  @ApiProperty({
    // @ts-ignore
    type: User,
  })
  @Prop({
    required: true,
    type: String,
    ref: () => User.name
  })
  user!: User;

}

const _AuthProviderSchema = SchemaFactory.createForClass(AuthProvider);

_AuthProviderSchema.set('toJSON', {
  transform: function (doc: any, ret: AuthProviderDocument, options: any) {
    delete ret.latestAccessToken;
    return ret;
  }
});
export const AuthProviderSchema = _AuthProviderSchema;