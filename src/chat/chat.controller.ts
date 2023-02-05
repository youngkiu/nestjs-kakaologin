import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';

@ApiTags('CHAT')
@ApiCookieAuth()
@Controller('chat')
export class ChatController {
  @ApiOperation({ summary: 'JWT guarded' })
  @UseGuards(JwtAuthGuard)
  @Get()
  @Render('chat')
  getChat() {
    return {};
  }
}
