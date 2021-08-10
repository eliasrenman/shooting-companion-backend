import { Controller, Get, Req, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { GoogleService } from './google.service';
import { PROVIDER_ENDPOINT_PREFIX } from '../providers.const';
import { ApiTags } from '@nestjs/swagger';

@Controller(PROVIDER_ENDPOINT_PREFIX + 'google')
@ApiTags('auth/google')
export class GoogleController {
  constructor(private readonly appService: GoogleService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: Request) {
    return this.appService.login(req)
  }
}