import { Module } from '@nestjs/common';
import { MongoConfigService } from './mongo-config.service';
import mongoConfiguration from './mongo.configuration';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [mongoConfiguration],
      validationSchema: Joi.object({
        MONGO_DB_URI: Joi.string().required(),
        DB_CERT: Joi.string(),
      }),
    }),
    
  ],
  providers: [MongoConfigService],
  exports: [MongoConfigService]
})
export class MongoConfigModule {}
