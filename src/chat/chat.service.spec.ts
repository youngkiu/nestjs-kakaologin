import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';
import { EventsGateway } from '../events/events.gateway';
import { UsersService } from '../users/users.service';

describe('ChatService', () => {
  let service: ChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatService, EventsGateway, UsersService],
    }).compile();

    service = module.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
