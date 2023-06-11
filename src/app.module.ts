import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerModule } from 'nestjs-pino';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { EventsModule } from './events/events.module';
import { SentryInterceptor } from './sentry/sentry.interceptor';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    ChatModule,
    EventsModule,
    LoggerModule.forRoot({
      pinoHttp: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        customProps: (req, res) => ({
          context: 'HTTP',
        }),
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useValue: new SentryInterceptor(),
    },
    AppService,
  ],
})
export class AppModule {}
