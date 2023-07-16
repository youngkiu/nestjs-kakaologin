import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { SendgridService } from '../sendgrid/sendgrid.service';
import { UserDto } from '../user/user.dto';

import { JwtPayloadDto } from './jwt/jwt.payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly sendgridService: SendgridService,
  ) {}

  async login(userData: UserDto) {
    const { provider, providerId, email } = userData;

    await this.sendgridService.sendLogin(email);

    const payload: JwtPayloadDto = { provider, providerId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
