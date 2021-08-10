import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

import { Injectable } from '@nestjs/common';
import { GoogleConfigService } from './config/google-config.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

  public constructor(private googleConfigService: GoogleConfigService) {
    super(googleConfigService.getConfig());
  }

  public validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): any {
    const { name, emails, photos, id } = profile;

    const user = {
      primaryKey: id,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}
