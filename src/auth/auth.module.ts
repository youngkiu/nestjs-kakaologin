import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { PrismaService } from '../prisma/prisma.service';
import { SendgridService } from '../sendgrid/sendgrid.service';
import { UserService } from '../user/user.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './google/google.auth.guard';
import { GoogleStrategy } from './google/google.strategy';
import { JwtAuthGuard } from './jwt/jwt.auth.guard';
import { JwtStrategy } from './jwt/jwt.strategy';
import { KakaoAuthGuard } from './kakao/kakao.auth.guard';
import { KakaoStrategy } from './kakao/kakao.strategy';

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
    GoogleStrategy,
    GoogleAuthGuard,
    JwtStrategy,
    JwtAuthGuard,
    UserService,
    AuthService,
    SendgridService,
    PrismaService,
  ],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
