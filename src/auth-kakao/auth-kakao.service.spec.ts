import { Test, TestingModule } from '@nestjs/testing';
import { AuthKakaoService } from './auth-kakao.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

describe('AuthKakaoService', () => {
  let service: AuthKakaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, HttpModule],
      providers: [AuthKakaoService],
    }).compile();

    service = module.get<AuthKakaoService>(AuthKakaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
