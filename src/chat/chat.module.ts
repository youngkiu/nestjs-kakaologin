import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { EventsModule } from '../events/events.module';
import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [EventsModule],
  controllers: [ChatController],
  providers: [ChatService, UserService, PrismaService],
})
export class ChatModule {}
