import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { GmailSmtpService } from '../gmail_smtp/gmail_smtp.service';

import { CallbackUserDataDto } from './dto/callback_user_data.dto';
import { JwtPayloadDto } from './dto/jwt.payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly gmailSmtpService: GmailSmtpService,
  ) {}

  async login(userData: CallbackUserDataDto) {
    const { provider, providerId, email } = userData;

    await this.gmailSmtpService.sendLogin(email);

    const payload: JwtPayloadDto = { provider, providerId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
