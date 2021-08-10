import { Module } from '@nestjs/common';
import { MongoConfigModule } from './config/mongo-config.module';
import { MongoConfigService } from './config/mongo-config.service';
import { MongooseModule } from '@nestjs/mongoose';
import mongoConnectionFactory from './mongo-connection.factory';

@Module({
  
  imports: [
    MongoConfigModule,
    MongooseModule.forRootAsync({
      imports: [MongoConfigModule],
      inject: [MongoConfigService],
      

      useFactory: (configService: MongoConfigService)=> ({
        uri: configService.uri,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true,

        sslValidate: configService.cert ? true: false,
        sslCA: configService.cert || undefined,
        connectionFactory: mongoConnectionFactory,
      })
    }),
  ]
})
export class MongoModule {}
