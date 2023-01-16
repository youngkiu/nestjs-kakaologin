import { Module } from '@nestjs/common';
import { KakaoAuthController } from './kakao.auth.controller';
import { KakaoStrategy } from './kakao.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule.register({ ssesion: true })],
  controllers: [KakaoAuthController],
  providers: [KakaoStrategy],
})
export class AuthModule {}
