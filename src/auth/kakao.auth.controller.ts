import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/user.decorator';

@Controller('auth/kakao')
export class KakaoAuthController {
  constructor(private readonly configService: ConfigService) {}

  @Get('callback')
  @UseGuards(AuthGuard('kakao'))
  @Render('callback')
  callback(@User() user) {
    const {
      profile: { id, username },
      token: { accessToken, refreshToken },
    } = user;
    return {
      data: {
        id,
        username,
        accessToken,
        refreshToken,
      },
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
