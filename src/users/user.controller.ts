import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { JwtPayloadDto } from '../auth/jwt.payload.dto';
import { RequestUser } from './users.decorator';
import { UserDto } from './user.dto';
import { UsersService } from './users.service';

@ApiTags('USER')
@ApiCookieAuth()
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

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
    const { provider, id } = reqUser;
    const userData: UserDto = await this.usersService.findOne(provider, id);
    const { username, thumbnailImage } = userData;
    return {
      provider,
      id,
      username,
      thumbnailImage,
    };
  }
}
