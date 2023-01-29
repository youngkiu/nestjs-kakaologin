import { Injectable } from '@nestjs/common';
import { JwtPayloadDto } from './jwt.payload.dto';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../users/user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: UserDto) {
    const { provider, id, username } = user;
    const payload: JwtPayloadDto = { provider, id, username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
