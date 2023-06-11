/* eslint @typescript-eslint/no-explicit-any: 0 */
import { Injectable, ConsoleLogger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
  constructor(private readonly configService: ConfigService) {
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
    const configs = {
      method: 'POST',
      url: this.configService.get<string>('SLACK_WEBHOOK_URL'),
      headers: { 'content-type': 'application/json' },
      data: {
        channel: this.configService.get<string>('SLACK_CHANNEL'),
        username: this.configService.get<string>('SLACK_USERNAME'),
        icon_emoji: this.configService.get<string>('SLACK_EMOJI'),
        text: message,
      },
    };

    axios(configs)
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
