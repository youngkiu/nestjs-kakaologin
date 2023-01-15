import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import * as qs from 'qs';
import * as _ from 'lodash';

@Injectable()
export class AuthKakaoService {
  private readonly logger = new Logger(AuthKakaoService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async getToken(code): Promise<AxiosResponse['data']> {
    this.logger.debug({ code });
    const host = this.configService.get<string>('KAKAO_REST_API_HOST');
    // https://developers.kakao.com/docs/latest/en/kakaologin/rest-api#request-token-request
    const url = `https://${host}/oauth/token`;
    const data = {
      grant_type: 'authorization_code',
      client_id: this.configService.get<string>('KAKAO_REST_API_KEY'),
      redirect_uri: this.configService.get<string>('KAKAO_REDIRECT_URI'),
      code,
      client_secret: this.configService.get<string>('KAKAO_CLIENT_SECRET'),
    };
    const response = await this.httpService.axiosRef.post<string>(
      url,
      qs.stringify(data),
      {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      },
    );
    return _.mapKeys(response.data, (v, k) => _.camelCase(k));
  }
}
