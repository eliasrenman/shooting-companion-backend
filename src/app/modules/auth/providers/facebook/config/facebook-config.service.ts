
import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { ConfigType } from '@nestjs/config';
import facebookConfiguration from './facebook.configuration';

@Injectable()
export class FacebookConfigService {

  private readonly SCOPES = [
    'email',
    'public_profile'
  ]

  private readonly PROFILE_FIELDS = [
    "emails", 
    "name",
    "picture"
  ];

  public constructor(
    @Inject(facebookConfiguration.KEY) private readonly facebookConfig: ConfigType<typeof facebookConfiguration>) {}

  public getConfig() {
    return {
      clientID: this.facebookConfig.clientID,
      clientSecret: this.facebookConfig.clientSecret,
      callbackURL: this.facebookConfig.callbackURL,
      scope: this.SCOPES.join(','),
      profileFields: this.PROFILE_FIELDS
    };
  }
}
