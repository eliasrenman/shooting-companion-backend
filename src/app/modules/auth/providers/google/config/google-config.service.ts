
import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { ConfigType } from '@nestjs/config';
import googleConfiguration from './google.configuration';

@Injectable()
export class GoogleConfigService {

  private readonly SCOPES = [
    'email',
    'profile',
  ]

  public constructor(
    @Inject(googleConfiguration.KEY) private readonly googleConfig: ConfigType<typeof googleConfiguration>) {}

  public getConfig() {
    return {
      clientID: this.googleConfig.clientID,
      clientSecret: this.googleConfig.clientSecret,
      callbackURL: this.googleConfig.callbackURL,
      scope: this.SCOPES,
    };
  }
}
