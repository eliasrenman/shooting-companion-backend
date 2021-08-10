import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../../auth.service';
import { FacebookAuthProviderAdapter } from './adapter/facebook-auth-provider.adapter';
import { FacebookUser } from './types/facebook-user.type';

@Injectable()
export class FacebookService {

  constructor(@Inject(forwardRef(() => AuthService)) private readonly authService: AuthService) { }

  public async login(req: Request) {
    if (!req.user) {
      return 'No user from google'
    }
    const parsedInput = await new FacebookAuthProviderAdapter(req.user as FacebookUser).parsed;

    return await this.authService.login(parsedInput)
  }
}
