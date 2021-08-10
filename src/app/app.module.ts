import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './../shared/database/database.module';
import { AppConfigModule } from './config/app-config.module';

@Module({
  imports: [
    AuthModule,
    AppConfigModule,
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
