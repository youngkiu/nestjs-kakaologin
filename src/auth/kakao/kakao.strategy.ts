import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import * as _ from 'lodash';
import { Strategy } from 'passport-kakao';

import { UserService } from '../../user/user.service';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(KakaoStrategy.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly usersService: UserService,
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

      const response = await this.httpService.axiosRef.post(
        // https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#req-user-info
        'https://kapi.kakao.com/v2/user/me',
        'property_keys=["kakao_account.profile","kakao_account.email"]',
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const {
        data: {
          kakao_account: { email },
        },
      } = response;
      return email;
    })();

    this.logger.verbose(JSON.stringify({ ...profileRest }));
    const { provider, id, username } = profileRest;
    const providerId = id.toString();
    const user = await this.usersService.findOne({
      provider_providerId: {
        provider,
        providerId,
      },
    });
    if (user) {
      return done(null, user);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { nickname, profileImage, thumbnailImage } = _.mapKeys(
      properties,
      (v, k) => {
        return _.camelCase(k);
      },
    );
    const userData = {
      // profile
      provider,
      providerId,
      username,
      email,
      // properties
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
