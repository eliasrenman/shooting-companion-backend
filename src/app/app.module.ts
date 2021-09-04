import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './../shared/database/database.module';
import { AppConfigModule } from './config/app-config.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SyncModule } from './modules/sync/sync.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../..', 'static'),
      // rootPath: '../static',
      // serveRoot: 'static'
    }),
    EventEmitterModule.forRoot({
      delimiter: '.',
      wildcard: true,
    }),
    AuthModule,
    AppConfigModule,
    DatabaseModule,
    SyncModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
