import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { KakaoStrategy } from './kakao.strategy';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './session.serializer';
import { KakaoAuthGuard } from './kakao.auth.guard';
import { SessionAuthGuard } from './session.auth.guard';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';

@Module({
  imports: [PassportModule.register({ ssesion: true }), UserModule],
  controllers: [AuthController],
  providers: [
    KakaoStrategy,
    SessionSerializer,
    KakaoAuthGuard,
    SessionAuthGuard,
    UserService,
  ],
})
export class AuthModule {}
