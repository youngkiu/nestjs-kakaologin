import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../prisma/prisma.service';
import { SendgridService } from '../sendgrid/sendgrid.service';
import { UserService } from '../user/user.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('KakaoAuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UserService,
        ConfigService,
        JwtService,
        SendgridService,
        PrismaService,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
