import { Injectable } from '@nestjs/common';
import { JwtPayloadDto } from './jwt.payload.dto';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../user/user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(userData: UserDto) {
    const { provider, providerId } = userData;
    const payload: JwtPayloadDto = { provider, providerId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
