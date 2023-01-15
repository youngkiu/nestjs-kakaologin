import { Module } from '@nestjs/common';
import { AuthKakaoController } from './auth-kakao.controller';
import { KakaoStrategy } from './kakao.strategy';

@Module({
  controllers: [AuthKakaoController],
  providers: [KakaoStrategy],
})
export class AuthKakaoModule {}
