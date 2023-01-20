import {
  Controller,
  Get,
  Render,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/user.decorator';
import { SessionAuthGuard } from './session.auth.guard';
import { KakaoAuthGuard } from './kakao.auth.guard';

@Controller('auth/kakao')
export class AuthController {
  constructor(private readonly configService: ConfigService) {}

  @Get('callback')
  @UseGuards(KakaoAuthGuard)
  callback(@Res() res) {
    res.redirect('protected');
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

  @Get('protected')
  @UseGuards(SessionAuthGuard)
  @Render('protected')
  protected(@User() user) {
    const { provider, id, username } = user;
    return {
      data: {
        provider,
        id,
        username,
      },
    };
  }

  @Get('logout')
  logout(@Session() session: Record<string, any>, @Res() res) {
    session.destroy();
    res.redirect('login');
  }
}
