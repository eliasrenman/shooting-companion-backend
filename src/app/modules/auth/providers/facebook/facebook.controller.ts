import { AuthProvider } from './../../model/auth-provider.model';
import { Controller, Get, Redirect, Req, Res, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { FacebookService as FacebookService } from './facebook.service';
import { PROVIDER_ENDPOINT_PREFIX } from '../providers.const';
import { ApiBody, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { stringify } from 'query-string';

@Controller(PROVIDER_ENDPOINT_PREFIX + 'facebook')
@ApiTags('auth/facebook')
export class FacebookController {
  constructor(private readonly appService: FacebookService) {}

  @Get()
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth() {}

  @Get('redirect')
  @ApiBody({description: 'Facebook redirect'})
  @ApiExtraModels(AuthProvider)
  @UseGuards(AuthGuard('facebook'))
  @Redirect('shootingcompanion://callback')
  async facebookAuthRedirect(@Req() req: Request, @Res() res: Response) {
    // @ts-ignore
    const {user: _user, ...loginData} = await this.appService.login(req);

    return {
      url: `shootingcompanion://callback?${stringify({...loginData, user: JSON.stringify(_user)})}`
    }
  }

}