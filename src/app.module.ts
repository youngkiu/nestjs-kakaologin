import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerModule as HTTPLoggerModule } from 'nestjs-pino';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { EventsModule } from './events/events.module';
import { LoggerModule } from './logger/logger.module';
import { PrismaModule } from './prisma/prisma.module';
import { SentryInterceptor } from './sentry/sentry.interceptor';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    ChatModule,
    EventsModule,
    HTTPLoggerModule.forRoot({
      pinoHttp: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        customProps: (req, res) => ({
          context: 'HTTP',
        }),
      },
    }),
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useFactory: () => new SentryInterceptor(),
    },
    AppService,
  ],
})
export class AppModule {}
