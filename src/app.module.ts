import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthKakaoModule } from './auth-kakao/auth-kakao.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthKakaoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
