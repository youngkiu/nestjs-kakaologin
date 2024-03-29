import { Controller, Get, Render } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation } from '@nestjs/swagger';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly configService: ConfigService,
    private readonly appService: AppService,
  ) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('error')
  getError(): string {
    throw new Error('Hi Sentry!');
  }

  @ApiOperation({
    summary: 'login',
    description: 'Access the path directly in web browser, not Swagger',
  })
  @Get()
  @Render('login')
  login() {
    return {
      data: {
        kakaoRestApiKey: this.configService.get<string>('KAKAO_REST_API_KEY'),
        kakaoRedirectUri: this.configService.get<string>('KAKAO_REDIRECT_URI'),
        googleClientId: this.configService.get<string>('GOOGLE_CLIENT_ID'),
        googleRedirectUri: this.configService.get<string>(
          'GOOGLE_REDIRECT_URI',
        ),
        mixpanelToken: this.configService.get<string>('MIXPANEL_TOKEN'),
        amplitudeApiKey: this.configService.get<string>('AMPLITUDE_API_KEY'),
      },
    };
  }
}
