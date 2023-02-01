import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
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

  @ApiOperation({ summary: 'Redirect URI registered in the OAuth provider' })
  @ApiQuery({ name: 'code', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Logged in successfully via the OAuth provider.',
  })
  @Get('callback')
  @UseGuards(KakaoAuthGuard)
  async callback(@User() user: UserDto, @Res() res: Response) {
    const { access_token } = await this.authService.login(user);
    res.cookie('token', access_token, { httpOnly: true });
    res.redirect('/user/protected');
  }

  @ApiOperation({ summary: 'login' })
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
