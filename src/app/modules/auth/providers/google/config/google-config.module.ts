import * as Joi from 'joi';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GoogleConfigService } from './google-config.service';
import googleConfiguration from './google.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [googleConfiguration],
      validationSchema: Joi.object({
        GOOGLE_CLIENT_ID: Joi.string().required(),
        GOOGLE_CLIENT_SECRET: Joi.string().required(),
        GOOGLE_CALLBACK_URL: Joi.string().required(),
      }),
    }),
  ],
  providers: [GoogleConfigService],
  exports: [GoogleConfigService],

})
export class GoogleConfigModule {}
