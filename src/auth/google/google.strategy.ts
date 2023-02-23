import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { UserDto } from '../../users/user.dto';
import { UsersService } from '../../users/users.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_REDIRECT_URI'),
    });
  }

  async validate(accessToken, refreshToken, profile, cb) {
    const {
      id,
      displayName,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      name: { familyName, givenName },
      emails,
      photos,
      provider,
    } = profile;

    const user = await this.usersService.findOne(provider, id);
    if (user) {
      return cb(null, user);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [{ value: email, verified }] = emails;
    const [{ value: photo }] = photos;
    const userData: UserDto = {
      provider,
      id,
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
