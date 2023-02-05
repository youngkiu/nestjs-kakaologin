import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';

@Controller('chat')
export class ChatController {
  @UseGuards(JwtAuthGuard)
  @Get()
  @Render('chat')
  getChat() {
    return {};
  }
}
