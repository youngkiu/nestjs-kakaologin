import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Res, UseGuards } from '@nestjs/common';
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
    res.redirect('/chat');
  }
}
