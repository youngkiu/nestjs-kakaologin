import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { KakaoAuthController } from './kakao.auth.controller';

describe('KakaoAuthController', () => {
  let controller: KakaoAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [KakaoAuthController],
    }).compile();

    controller = module.get<KakaoAuthController>(KakaoAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
