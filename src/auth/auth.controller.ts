import { Controller, Get, Res, UseFilters, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { CallbackUserData } from './decorator/callback_user_data.decorator';
import { CallbackUserDataDto } from './dto/callback_user_data.dto';
import { GoogleAuthGuard } from './google/google.auth.guard';
import { KakaoAuthGuard } from './kakao/kakao.auth.guard';
import { KakaoExceptionFilter } from './kakao/kakao.exception.filter';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  @ApiExcludeEndpoint()
  @Get('kakao/callback')
  @UseGuards(KakaoAuthGuard)
  @UseFilters(new KakaoExceptionFilter())
  async kakaoCallback(
    @CallbackUserData() userData: CallbackUserDataDto,
    @Res() res: Response,
  ) {
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
  async googleCallback(
    @CallbackUserData() userData: CallbackUserDataDto,
    @Res() res: Response,
  ) {
    const { access_token } = await this.authService.login(userData);

    res.cookie(
      this.configService.get<string>('AUTH_COOKIE_NAME'),
      access_token,
      { httpOnly: true },
    );
    res.redirect('/chat');
  }
}
