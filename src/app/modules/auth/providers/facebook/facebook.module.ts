import { Module, forwardRef } from '@nestjs/common';
import { FacebookConfigModule } from './config/facebook-config.module';
import { FacebookService } from './facebook.service';
import { FacebookStrategy } from './facebook.strategy';
import { FacebookController } from './facebook.controller';
import { AuthModule } from '../../auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    FacebookConfigModule,
  ],
  controllers:[
    FacebookController
  ],
  providers: [FacebookService, FacebookStrategy],
})
export class FacebookModule {}
