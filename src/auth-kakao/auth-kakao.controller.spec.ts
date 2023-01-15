import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { AuthKakaoController } from './auth-kakao.controller';

describe('AuthKakaoController', () => {
  let controller: AuthKakaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [AuthKakaoController],
    }).compile();

    controller = module.get<AuthKakaoController>(AuthKakaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
