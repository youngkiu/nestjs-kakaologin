import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Res, UseFilters, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { GoogleAuthGuard } from './google/google.auth.guard';
import { KakaoAuthGuard } from './kakao/kakao.auth.guard';
import { KakaoExceptionFilter } from './kakao/kakao.exception.filter';
import { RequestUser } from '../users/users.decorator';
import { Response } from 'express';
import { SendgridService } from '../sendgrid/sendgrid.service';
import { UserDto } from '../users/user.dto';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly sendgridService: SendgridService,
  ) {}

  @ApiExcludeEndpoint()
  @Get('kakao/callback')
  @UseGuards(KakaoAuthGuard)
  @UseFilters(new KakaoExceptionFilter())
  async kakaoCallback(@RequestUser() userData: UserDto, @Res() res: Response) {
    await this.sendgridService.sendLogin(userData.email);

    const { access_token } = await this.authService.login(userData);
    res.cookie(
      this.configService.get<string>('AUTH_COOKIE_NAME'),
      access_token,
      { httpOnly: true },
    );
    res.redirect('/chat');
  }

  @ApiExcludeEndpoint()
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@RequestUser() userData: UserDto, @Res() res: Response) {
    await this.sendgridService.sendLogin(userData.email);

    const { access_token } = await this.authService.login(userData);
    res.cookie(
      this.configService.get<string>('AUTH_COOKIE_NAME'),
      access_token,
      { httpOnly: true },
    );
    res.redirect('/chat');
  }
}
