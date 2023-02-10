import { Controller, Get, Render } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

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

  @ApiOperation({
    summary: 'login',
    description: 'Access the path directly in web browser, not Swagger',
  })
  @Get()
  @Render('login')
  login() {
    return {
      data: {
        host: this.configService.get<string>('KAKAO_REST_API_HOST'),
        restApiKey: this.configService.get<string>('KAKAO_REST_API_KEY'),
        redirectUri: this.configService.get<string>('KAKAO_REDIRECT_URI'),
        mixpanel_token: this.configService.get<string>('MIXPANEL_TOKEN'),
      },
    };
  }
}
