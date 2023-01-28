import { Injectable } from '@nestjs/common';
import { JwtPayload } from './jwt.payload';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/users.entities';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: User) {
    const { provider, id, username } = user;
    const payload: JwtPayload = { provider, id, username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
