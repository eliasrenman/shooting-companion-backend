import { Module, forwardRef } from '@nestjs/common';
import { GoogleConfigModule } from './config/google-config.module';
import { GoogleService } from './google.service';
import { GoogleStrategy } from './google.strategy';
import { GoogleController } from './google.controller';
import { AuthModule } from '../../auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    GoogleConfigModule,
  ],
  controllers:[
    GoogleController
  ],
  providers: [GoogleService, GoogleStrategy],
})
export class GoogleModule {}
