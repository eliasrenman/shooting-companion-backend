import * as Joi from 'joi';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthConfigService } from './auth-config.service';
import jwtConfiguration from './auth.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [jwtConfiguration],
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_PRIVATE_KEY: Joi.string().required(),
        JWT_PUBLIC_KEY: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().default('7d'),
      }),
    }),
  ],
  providers: [AuthConfigService],
  exports: [AuthConfigService],

})
export class AuthConfigModule {}
