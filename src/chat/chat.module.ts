import { ChatController } from './chat.controller';
import { EventsModule } from '../events/events.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [EventsModule],
  controllers: [ChatController],
})
export class ChatModule {}
