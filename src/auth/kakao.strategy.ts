import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as _ from 'lodash';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.entities';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      clientID: configService.get<string>('KAKAO_REST_API_KEY'),
      clientSecret: configService.get<string>('KAKAO_CLIENT_SECRET'),
      callbackURL: configService.get<string>('KAKAO_REDIRECT_URI'),
    });
  }

  async validate(accessToken, refreshToken, profile, done) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _raw, _json, ...profileRest } = profile;
    const properties = _.mapKeys(_json.properties, (v, k) => {
      return _.camelCase(k);
    });

    const { provider, id, username } = profileRest;
    const user = await this.usersService.findOne(provider, id);
    if (user) {
      return done(null, user);
    }

    const { nickname, profileImage, thumbnailImage } = properties;
    const userData: User = {
      // profile
      provider,
      id,
      username,
      // properties
      nickname,
      profileImage,
      thumbnailImage,
      // token
      accessToken,
      refreshToken,
    };
    await this.usersService.create(userData);
    done(null, userData);
  }
}
