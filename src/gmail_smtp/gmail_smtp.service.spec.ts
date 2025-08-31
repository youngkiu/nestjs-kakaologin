import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { GmailSmtpService } from './gmail_smtp.service';

describe('GmailSmtpService', () => {
  let service: GmailSmtpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GmailSmtpService,
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

    service = module.get<GmailSmtpService>(GmailSmtpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
