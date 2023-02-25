import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { EventsModule } from '../events/events.module';
import { Module } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Module({
  imports: [EventsModule],
  controllers: [ChatController],
  providers: [ChatService, UsersService],
})
export class ChatModule {}
