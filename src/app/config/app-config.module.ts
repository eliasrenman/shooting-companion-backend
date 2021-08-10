import { Module } from '@nestjs/common';
import { AppConfigService } from './app-config.service';
import appConfiguration from './app.configuration';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfiguration],
      validationSchema: Joi.object({
        HTTP_PORT: Joi.string().default(8080),
        NODE_ENV: Joi.string()
      }),
    }),
  ],
  providers: [
    AppConfigService
  ],
  exports: [
    AppConfigService
  ]
})
export class AppConfigModule {}
