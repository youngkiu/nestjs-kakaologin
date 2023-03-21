import * as _ from 'lodash';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { UserDto } from '../../users/user.dto';
import { UsersService } from '../../users/users.service';
import axios from 'axios';

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { connected_at, properties, kakao_account } = _json;

    const email = await (async () => {
      if (kakao_account.email) {
        return kakao_account.email;
      }

      const response = await axios({
        // https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#req-user-info
        url: 'https://kapi.kakao.com/v2/user/me',
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${accessToken}`,
        },
        data: 'property_keys=["kakao_account.profile","kakao_account.email"]',
      });
      const { email } = response?.data?.kakao_account;
      return email;
    })();

    const { provider, id, username } = profileRest;
    const user = await this.usersService.findOne(provider, id);
    if (user) {
      return done(null, user);
    }

    const { nickname, profileImage, thumbnailImage } = _.mapKeys(
      properties,
      (v, k) => {
        return _.camelCase(k);
      },
    );
    const userData: UserDto = {
      // profile
      provider,
      id,
      username,
      email,
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
