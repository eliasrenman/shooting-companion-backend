import appConfiguration from './app.configuration';
import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AppConfigService {

  public constructor(
    @Inject(appConfiguration.KEY) private readonly appConfig: ConfigType<typeof appConfiguration>) {}

  public get port(): string {
    return this.appConfig.HTTP_PORT as string;
  }

  public get isProduction(): boolean {
    const result = this.appConfig.NODE_ENV === 'production';
    console.log(result, this.appConfig.NODE_ENV);
    
    return result;
  }
}