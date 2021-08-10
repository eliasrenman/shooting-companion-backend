import { Injectable, Inject } from '@nestjs/common';
import mongoConfiguration from './mongo.configuration';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class MongoConfigService {

  public constructor(
    @Inject(mongoConfiguration.KEY) private readonly mongoConfig: ConfigType<typeof mongoConfiguration>) {}


  public get uri(): string {
    return this.mongoConfig.DB_URI as string;
  }

  public get cert(): string[] | undefined {
    if(this.mongoConfig.DB_CERT) {
      return [this.mongoConfig.DB_CERT];
    }
  }
}
