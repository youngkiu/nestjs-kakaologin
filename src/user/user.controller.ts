import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/jwt/jwt.auth.guard';
import { JwtPayloadDto } from '../auth/jwt/jwt.payload.dto';

import { RequestUser } from './user.decorator';
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
  async getUserProfile(@RequestUser() reqUser: JwtPayloadDto) {
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
