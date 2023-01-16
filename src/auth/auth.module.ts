import { Module } from '@nestjs/common';
import { KakaoAuthController } from './kakao.auth.controller';
import { KakaoStrategy } from './kakao.strategy';

@Module({
  controllers: [KakaoAuthController],
  providers: [KakaoStrategy],
})
export class AuthModule {}
