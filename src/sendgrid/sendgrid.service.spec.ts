import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { SendgridService } from './sendgrid.service';

describe('SendgridService', () => {
  let service: SendgridService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SendgridService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockImplementation((key: string) => {
              if (key === 'GMAIL_USER') return 'test@gmail.com';
              if (key === 'GMAIL_APP_PASSWORD') return 'testpassword';
              return null;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<SendgridService>(SendgridService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
