import { ApiExcludeEndpoint, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Render, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { KakaoAuthGuard } from './kakao.auth.guard';
import { Response } from 'express';
import { User } from '../users/users.decorator';
import { UserDto } from '../users/user.dto';

@ApiTags('AUTH')
@Controller('auth/kakao')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  @ApiExcludeEndpoint()
  @Get('callback')
  @UseGuards(KakaoAuthGuard)
  async callback(@User() user: UserDto, @Res() res: Response) {
    const { access_token } = await this.authService.login(user);
    res.cookie(
      this.configService.get<string>('AUTH_COOKIE_NAME'),
      access_token,
      { httpOnly: true },
    );
    res.redirect('/user/protected');
  }

  @ApiOperation({
    summary: 'login',
    description: 'Access the path directly in web browser, not Swagger',
  })
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
