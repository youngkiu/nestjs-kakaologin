import {
  Controller,
  Get,
  Render,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

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
  kakaoLoginCallback(@Req() req) {
    const {
      user: {
        profile: { id, username },
        token: { accessToken, refreshToken },
      },
    } = req;
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
