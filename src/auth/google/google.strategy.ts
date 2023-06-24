import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

import { UserService } from '../../user/user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(GoogleStrategy.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UserService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_REDIRECT_URI'),
    });
  }

  async validate(accessToken, refreshToken, profile, cb) {
    const {
      id: providerId,
      displayName,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      name: { familyName, givenName },
      emails,
      photos,
      provider,
    } = profile;

    this.logger.verbose(JSON.stringify({ ...profile }));
    const user = await this.usersService.findOne({
      provider_providerId: {
        provider,
        providerId,
      },
    });
    if (user) {
      return cb(null, user);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [{ value: email, verified }] = emails;
    const [{ value: photo }] = photos;
    const userData = {
      provider,
      providerId,
      username: displayName,
      email: email,
      nickname: undefined,
      profileImage: photo,
      thumbnailImage: undefined,
      accessToken,
      refreshToken,
    };
    await this.usersService.create(userData);
    cb(null, userData);
  }
}
