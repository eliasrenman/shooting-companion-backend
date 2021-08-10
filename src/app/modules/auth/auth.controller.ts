import { Controller, Request, Get } from '@nestjs/common';
import { Auth } from './jwt-auth-guard.decorator';


@Controller('auth')
export class AuthController {

  @Auth()
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
