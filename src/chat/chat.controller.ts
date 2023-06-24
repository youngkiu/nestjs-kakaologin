import { Body, Controller, Get, Post, Render, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/jwt/jwt.auth.guard';
import { JwtPayloadDto } from '../auth/jwt/jwt.payload.dto';
import { RequestUser } from '../user/user.decorator';

import { ChatService } from './chat.service';

@ApiTags('CHAT')
@ApiCookieAuth()
@Controller('chat')
export class ChatController {
  constructor(
    private readonly configService: ConfigService,
    private readonly chatService: ChatService,
  ) {}
  @ApiOperation({ summary: 'JWT guarded' })
  @UseGuards(JwtAuthGuard)
  @Get()
  @Render('chat')
  getChat() {
    return {
      data: {
        mixpanelToken: this.configService.get<string>('MIXPANEL_TOKEN'),
        amplitudeApiKey: this.configService.get<string>('AMPLITUDE_API_KEY'),
      },
    };
  }

  @ApiOperation({ summary: 'JWT guarded' })
  @UseGuards(JwtAuthGuard)
  @Post()
  async postChat(
    @Body('content') content,
    @RequestUser() reqUser: JwtPayloadDto,
  ) {
    return await this.chatService.createChannelChats(content, reqUser);
  }
}
