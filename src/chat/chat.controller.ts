import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post, Render, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { JwtPayloadDto } from '../auth/jwt.payload.dto';
import { RequestUser } from '../users/users.decorator';

@ApiTags('CHAT')
@ApiCookieAuth()
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @ApiOperation({ summary: 'JWT guarded' })
  @UseGuards(JwtAuthGuard)
  @Get()
  @Render('chat')
  getChat() {
    return {};
  }

  @ApiOperation({ summary: 'JWT guarded' })
  @UseGuards(JwtAuthGuard)
  @Post()
  postChat(@Body('content') content, @RequestUser() reqUser: JwtPayloadDto) {
    return this.chatService.createChannelChats(content, reqUser);
  }
}
