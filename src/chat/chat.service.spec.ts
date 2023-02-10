import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';
import { EventsGateway } from '../events/events.gateway';

describe('ChatService', () => {
  let service: ChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatService, EventsGateway],
    }).compile();

    service = module.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
