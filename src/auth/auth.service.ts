import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserDto } from '../user/user.dto';
import { UserService } from '../user/user.service';

import { JwtPayloadDto } from './jwt/jwt.payload.dto';

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
