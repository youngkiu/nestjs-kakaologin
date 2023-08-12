import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { SendgridService } from '../sendgrid/sendgrid.service';

import { CallbackUserDataDto } from './dto/callback_user_data.dto';
import { JwtPayloadDto } from './dto/jwt.payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly sendgridService: SendgridService,
  ) {}

  async login(userData: CallbackUserDataDto) {
    const { provider, providerId, email } = userData;

    await this.sendgridService.sendLogin(email);

    const payload: JwtPayloadDto = { provider, providerId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
