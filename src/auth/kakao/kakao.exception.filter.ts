import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { Response } from 'express';

type ExceptionObject = {
  statusCode: number;
  data: string;
};

@Catch()
export class KakaoExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(KakaoExceptionFilter.name);

  catch(exception: ExceptionObject, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const { statusCode, data } = exception;
    Sentry.captureException(data);

    if (data) {
      const { msg, code } = JSON.parse(data);
      this.logger.error({ statusCode, msg, code });
    } else {
      this.logger.error(exception);
    }

    // = throw new InternalServerErrorException();
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    });
  }
}
