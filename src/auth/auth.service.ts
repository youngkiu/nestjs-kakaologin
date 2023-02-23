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

  async login(userData: UserDto) {
    const { provider, id } = userData;
    const payload: JwtPayloadDto = { provider, id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
