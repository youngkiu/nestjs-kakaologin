import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { EventsModule } from '../events/events.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [EventsModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
