import { Controller, Get, Redirect, Req, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { FacebookService as FacebookService } from './facebook.service';
import { PROVIDER_ENDPOINT_PREFIX } from '../providers.const';
import { ApiTags } from '@nestjs/swagger';

@Controller(PROVIDER_ENDPOINT_PREFIX + 'facebook')
@ApiTags('auth/facebook')
export class FacebookController {
  constructor(private readonly appService: FacebookService) {}

  @Get()
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth() {}

  @Get('redirect')
  @UseGuards(AuthGuard('facebook'))
  @Redirect('shootingcompanion://callback/')

  async facebookAuthRedirect(@Req() req: Request) {
    return { url: `shootingcompanion://callback?data=${JSON.stringify(await this.appService.login(req))}` };

    return 
  }

}