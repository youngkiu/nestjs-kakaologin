import {
  Controller,
  Get,
  Logger,
  Render,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { SessionAuthGuard } from './session.auth.guard';

@Controller('auth/kakao')
export class KakaoAuthController {
  private readonly logger = new Logger(KakaoAuthController.name);

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

    res.redirect('protected');
  }

  @Get('login')
  @Render('login')
  login(@Session() session: Record<string, any>) {
    this.logger.debug({ session });
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
  protected(@Session() session: Record<string, any>) {
    this.logger.debug({ session });
    const { provider, userId, accessToken } = session;
    return {
      data: {
        provider,
        userId,
        accessToken,
      },
    };
  }

  @Get('logout')
  logout(@Session() session: Record<string, any>, @Res() res) {
    session.destroy();
    res.redirect('login');
  }
}
