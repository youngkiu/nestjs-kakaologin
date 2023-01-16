import {
  Controller,
  Get,
  Render,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/user.decorator';

@Controller('auth/kakao')
export class KakaoAuthController {
  constructor(private readonly configService: ConfigService) {}

  @Get('callback')
  @UseGuards(AuthGuard('kakao'))
  callback(@User() user, @Session() session: Record<string, any>, @Res() res) {
    const {
      profile: { provider, id },
      token: { accessToken },
    } = user;

    session.provider = provider;
    session.userId = id;
    session.accessToken = accessToken;

    res.redirect('/');
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
