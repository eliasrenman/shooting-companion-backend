
import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { ConfigType } from '@nestjs/config';
import authConfiguration from './auth.configuration';

@Injectable()
export class AuthConfigService {

  public constructor(
    @Inject(authConfiguration.KEY) private readonly authConfig: ConfigType<typeof authConfiguration>) {}

  public get secret(): string {
    return this.authConfig.secret as string;
  }
  
  public get expiresIn(): string {
    return this.authConfig.expiresIn as string;
  }

  public get privateKey(): string {
    return this.authConfig.privateKey as string;
  }
  
  public get publicKey(): string {
    return this.authConfig.publicKey as string;
  }
}
