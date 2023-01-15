import { Controller, Get, Query, Render } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthKakaoService } from './auth-kakao.service';

@Controller('auth/kakao')
export class AuthKakaoController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authKakaoService: AuthKakaoService,
  ) {}

  @Get('callback')
  @Render('callback')
  async getCallback(@Query('code') code) {
    const { accessToken, refreshToken } = await this.authKakaoService.getToken(
      code,
    );
    return {
      data: { accessToken, refreshToken },
    };
  }

  @Get('login')
  @Render('login')
  login() {
    return {
      data: {
        host: this.configService.get<string>('KAKAO_REST_API_HOST'),
        restApiKey: this.configService.get<string>('KAKAO_REST_API_KEY'),
        redirectUri: this.configService.get<string>('KAKAO_REDIRECT_URI'),
      },
    };
  }
}
