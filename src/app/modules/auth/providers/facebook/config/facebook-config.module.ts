import * as Joi from 'joi';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FacebookConfigService } from './facebook-config.service';
import facebookConfiguration from './facebook.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [facebookConfiguration],
      validationSchema: Joi.object({
        FACEBOOK_CLIENT_ID: Joi.string().required(),
        FACEBOOK_CLIENT_SECRET: Joi.string().required(),
        FACEBOOK_CALLBACK_URL: Joi.string().required(),
      }),
    }),
  ],
  providers: [FacebookConfigService],
  exports: [FacebookConfigService],

})
export class FacebookConfigModule {}
