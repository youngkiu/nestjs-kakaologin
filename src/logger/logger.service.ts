/* eslint @typescript-eslint/no-explicit-any: 0 */
import { HttpService } from '@nestjs/axios';
import { Injectable, ConsoleLogger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    super();
  }
  debug(message: any, ...optionalParams: [...any, string?]) {
    super.debug(`${message}...`, ...optionalParams);
  }

  error(message: any, ...optionalParams: [...any, string?]) {
    super.error(`${message}...`, ...optionalParams);
    this.toSlack(message);
  }

  log(message: any, ...optionalParams: [...any, string?]) {
    super.log(`${message}...`, ...optionalParams);
  }

  verbose(message: any, ...optionalParams: [...any, string?]) {
    super.verbose(`${message}...`, ...optionalParams);
    this.toSlack(message);
  }

  warn(message: any, ...optionalParams: [...any, string?]) {
    super.warn(`${message}...`, ...optionalParams);
    this.toSlack(message);
  }

  private toSlack(message) {
    this.httpService.axiosRef
      .post(
        this.configService.get<string>('SLACK_WEBHOOK_URL'),
        {
          channel: this.configService.get<string>('SLACK_CHANNEL'),
          username: this.configService.get<string>('SLACK_USERNAME'),
          icon_emoji: this.configService.get<string>('SLACK_EMOJI'),
          text: message,
        },
        {
          headers: { 'content-type': 'application/json' },
        },
      )
      .then((response) => {
        if (response.status !== 200) {
          console.error({ ...response });
        }
      })
      .catch((e) => {
        throw new Error(`${e}`);
      });
  }
}
