import {
  Controller,
  Get,
  Render,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/users.decorator';
import { JwtAuthGuard } from './jwt.auth.guard';
import { KakaoAuthGuard } from './kakao.auth.guard';
import { AuthService } from './auth.service';

@Controller('auth/kakao')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  @Get('callback')
  @UseGuards(KakaoAuthGuard)
  callback(@User() user) {
    return this.authService.login(user);
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
  @UseGuards(JwtAuthGuard)
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
