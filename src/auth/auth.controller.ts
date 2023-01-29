import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { KakaoAuthGuard } from './kakao.auth.guard';
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
  callback(@User() user: UserDto) {
    return this.authService.login(user);
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
