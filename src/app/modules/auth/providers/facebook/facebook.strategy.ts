import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from "passport-facebook";

import { Injectable } from '@nestjs/common';
import { FacebookConfigService } from './config/facebook-config.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {

  public constructor(private facebookConfigService: FacebookConfigService) {
    super(facebookConfigService.getConfig());
  }

  public validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (err: any, user: any, info?: any) => void): any {

    const { name, photos, id } = profile;
    
    const user = {
      primaryKey: id,
      
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}
