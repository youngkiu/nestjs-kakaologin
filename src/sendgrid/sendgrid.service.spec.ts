import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { SendgridService } from './sendgrid.service';

describe('SendgridService', () => {
  let service: SendgridService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SendgridService, ConfigService],
    }).compile();

    service = module.get<SendgridService>(SendgridService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
