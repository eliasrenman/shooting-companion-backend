
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException } from '@nestjs/common';
import { AuthConfigService } from './config/auth-config.service';
import { User } from './user/model/user.model';

export type AuthStrategyJwtPayload = {
  exp: number;
  user: User,
  sub: string;
  refreshToken?: boolean;
}


@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: AuthConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.secret,
    });
  }

  async validate(payload: AuthStrategyJwtPayload) {
    
    if(payload.refreshToken) {
      throw new HttpException('This is a refresh token', 403);
    }
    return { userId: payload.sub, user: payload.user };
  }
}
