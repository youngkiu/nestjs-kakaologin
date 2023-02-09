import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { User } from './users.decorator';
import { UserDto } from './user.dto';

@ApiTags('USER')
@ApiCookieAuth()
@Controller('user')
export class UserController {
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
  @Get()
  protected(@User() user: UserDto) {
    const { provider, id, username } = user;
    return {
      provider,
      id,
      username,
    };
  }
}
