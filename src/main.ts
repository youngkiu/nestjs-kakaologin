import { join } from 'path';

import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as Sentry from '@sentry/node';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { AxiosHttpExceptionFilter } from './axios.http-exception.filter';
import { MyLoggerService } from './logger/logger.service';

async function bootstrap() {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
  });

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);

  app.useLogger(app.get(MyLoggerService));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AxiosHttpExceptionFilter());

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  const config = new DocumentBuilder()
    .setTitle('OAuth login on NestJS framework')
    .setDescription('The OAuth login starter API description')
    .setVersion('1.0')
    .addTag('nestjs-kakaologin')
    .addCookieAuth(configService.get('AUTH_COOKIE_NAME'))
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(cookieParser());

  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
}
bootstrap();
