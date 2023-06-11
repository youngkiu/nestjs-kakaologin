import { Module } from '@nestjs/common';

import { EventsModule } from '../events/events.module';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';

import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
  imports: [EventsModule],
  controllers: [ChatController],
  providers: [ChatService, UserService, PrismaService],
})
export class ChatModule {}
