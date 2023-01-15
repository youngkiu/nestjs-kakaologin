import { Module } from '@nestjs/common';
import { AuthKakaoController } from './auth-kakao.controller';
import { AuthKakaoService } from './auth-kakao.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [AuthKakaoController],
  providers: [AuthKakaoService],
})
export class AuthKakaoModule {}
