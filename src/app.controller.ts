import { Controller, Get, Query, Render } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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

  @Get('oauth')
  @Render('callback')
  async getCallback(@Query('code') code) {
    const { accessToken, refreshToken } = await this.appService.getToken(code);
    return {
      data: { accessToken, refreshToken },
    };
  }

  @Get()
  @Render('index')
  root() {
    return {
      data: {
        host: this.configService.get<string>('KAKAO_REST_API_HOST'),
        restApiKey: this.configService.get<string>('KAKAO_REST_API_KEY'),
        redirectUri: this.configService.get<string>('KAKAO_REDIRECT_URI'),
      },
    };
  }
}
