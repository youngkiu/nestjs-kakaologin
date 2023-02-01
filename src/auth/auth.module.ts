import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './jwt.auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { KakaoAuthGuard } from './kakao.auth.guard';
import { KakaoStrategy } from './kakao.strategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    KakaoStrategy,
    KakaoAuthGuard,
    JwtStrategy,
    JwtAuthGuard,
    UsersService,
    AuthService,
  ],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
