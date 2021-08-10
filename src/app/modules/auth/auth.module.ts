import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthProvider, AuthProviderSchema } from './model/auth-provider.model';
import { FacebookModule } from './providers/facebook/facebook.module';
import { GoogleModule } from './providers/google/google.module';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthConfigModule } from './config/auth-config.module';
import { AuthConfigService } from './config/auth-config.service';
import { AuthStrategy } from './auth.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule,
    AuthConfigModule,
    JwtModule.registerAsync({
      imports: [AuthConfigModule],
      inject: [AuthConfigService],
      useFactory: (configService: AuthConfigService)=> ({
        secret: configService.secret,
        publicKey: configService.publicKey,
        privateKey: configService.privateKey,
        signOptions: { expiresIn: configService.expiresIn },
      })
    }),

    forwardRef(() => GoogleModule),
    forwardRef(() => FacebookModule),
    UserModule,
    MongooseModule.forFeature([{ name: AuthProvider.name, schema: AuthProviderSchema }]),
  ],
  providers: [AuthService, AuthStrategy],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule { }
