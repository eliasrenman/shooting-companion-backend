import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../../auth.service';
import { GoogleAuthProviderAdapter } from './adapter/google-auth-provider.adapter';
import { GoogleUser } from './types/google-user.type';

@Injectable()
export class GoogleService {

  constructor(@Inject(forwardRef(() => AuthService)) private readonly authService: AuthService) { }

  public async login(req: Request) {
    if (!req.user) {
      return 'No user from google'
    }

    const parsedInput = await new GoogleAuthProviderAdapter(req.user as GoogleUser).parsed;

    return await this.authService.login(parsedInput)
  }
}
