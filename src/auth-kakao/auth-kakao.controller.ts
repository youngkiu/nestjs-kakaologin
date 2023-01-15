import { Controller, Get, Render, HttpStatus, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/user.decorator';

@Controller('auth/kakao')
export class AuthKakaoController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  @UseGuards(AuthGuard('kakao'))
  kakaoLogin() {
    return HttpStatus.OK;
  }

  @Get('callback')
  @UseGuards(AuthGuard('kakao'))
  @Render('callback')
  kakaoLoginCallback(@User() user) {
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
}
