import { Controller, Get, Redirect, Req, Res, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { GoogleService } from './google.service';
import { PROVIDER_ENDPOINT_PREFIX } from '../providers.const';
import { ApiTags } from '@nestjs/swagger';
import { stringify } from 'query-string';

@Controller(PROVIDER_ENDPOINT_PREFIX + 'google')
@ApiTags('auth/google')
export class GoogleController {
  constructor(private readonly appService: GoogleService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  @Redirect('shootingcompanion://callback')
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    // @ts-ignore
    const {user: _user, ...loginData} = await this.appService.login(req);

    return {
      url: `shootingcompanion://callback?${stringify({...loginData, user: JSON.stringify(_user)})}`
    }
  }
}