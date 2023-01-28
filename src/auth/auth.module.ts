import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { KakaoStrategy } from './kakao.strategy';
import { PassportModule } from '@nestjs/passport';
import { KakaoAuthGuard } from './kakao.auth.guard';
import { JwtAuthGuard } from './jwt.auth.guard';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule,
    UsersModule,
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
})
export class AuthModule {}
