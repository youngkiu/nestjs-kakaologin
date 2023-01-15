import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AuthKakaoController } from './auth-kakao.controller';
import { AuthKakaoService } from './auth-kakao.service';

describe('AuthKakaoController', () => {
  let controller: AuthKakaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, HttpModule],
      controllers: [AuthKakaoController],
      providers: [AuthKakaoService],
    }).compile();

    controller = module.get<AuthKakaoController>(AuthKakaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
