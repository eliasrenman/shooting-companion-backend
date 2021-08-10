import { Injectable } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthProvider, AuthProviderDocument } from './model/auth-provider.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from './user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  private readonly DEFAULT_POPULATE = 'user';

  constructor(@InjectModel(AuthProvider.name) private authModel: Model<AuthProviderDocument>,
  private userService: UserService,
  private jwtService: JwtService) {}


  public async login(data: AuthLoginDto) {
    const user = await this.fetchAndUpsertUser(data);
    return {
      user,
      ...this.createTokens(user)
    }
  }

  public async fetchAndUpsertUser(data: AuthLoginDto): Promise<AuthProviderDocument> {
    const authProvider = await this.authModel.findOne({
      primaryKey: data.primaryKey,
      provider: data.provider
    }).populate(this.DEFAULT_POPULATE);

    // Update Auth provider
    if(authProvider) {
      authProvider.latestAccessToken = data.latestAccessToken;
      await authProvider.save()
      
      // Update user imageUrl
      await this.userService.update({
        _id: authProvider.user._id,
        imageUrl: data.imageUrl
      })

      return await authProvider.populate(this.DEFAULT_POPULATE).execPopulate();

    } else {
      
      // Create a new auth provider and a new user.
      const user = await this.userService.create({
        name: data.name,
        imageUrl: data.imageUrl
      })

      // Create a new authProvider
      return await (await this.authModel.create({
        primaryKey: data.primaryKey,
        provider: data.provider,
        latestAccessToken: data.latestAccessToken,
        user: user._id
      })).populate(this.DEFAULT_POPULATE).execPopulate()
    }
  }

  private createTokens(authUser: AuthProviderDocument) {

    const payload = { user: authUser, sub: authUser.user._id };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign({ 
        sub: authUser.user._id,
        refreshToken: true
      }, {
        expiresIn: '31d'
      }),
    };
  }
}
