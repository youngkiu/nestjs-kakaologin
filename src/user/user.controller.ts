import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CallbackUserData } from '../auth/decorator/callback_user_data.decorator';
import { JwtPayloadDto } from '../auth/dto/jwt.payload.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.auth.guard';

import { UserService } from './user.service';

@ApiTags('USER')
@ApiCookieAuth()
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @ApiOperation({ summary: 'JWT guarded' })
  @ApiResponse({
    status: 200,
    description: 'Get user information with valid JWT token.',
  })
  @ApiResponse({
    status: 401,
    description: 'Failed to get user information with invalid JWT token.',
  })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getUserProfile(@CallbackUserData() reqUser: JwtPayloadDto) {
    const { provider, providerId } = reqUser;
    const user = await this.usersService.findOne({
      provider_providerId: {
        provider,
        providerId,
      },
    });
    const { username, thumbnailImage } = user;
    return {
      provider,
      providerId,
      username,
      thumbnailImage,
    };
  }
}
