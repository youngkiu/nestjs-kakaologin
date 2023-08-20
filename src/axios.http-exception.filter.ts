// https://dev.to/blminami/nestjs-intercept-axios-responses-and-throw-built-in-http-errors-for-the-exception-filter-1dd3
// https://stackoverflow.com/questions/72711256/nestjs-in-conjunction-with-axios
import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { Request, Response } from 'express';

@Catch(AxiosError)
export class AxiosHttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AxiosHttpExceptionFilter.name);

  catch(exception: AxiosError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const {
      message,
      response: { status = 400 },
    } = exception;

    this.logger.error(message);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
