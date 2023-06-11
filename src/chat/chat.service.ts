import { Injectable, Logger } from '@nestjs/common';

import { JwtPayloadDto } from '../auth/jwt.payload.dto';
import { EventsGateway } from '../events/events.gateway';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(
    private readonly eventsGateway: EventsGateway,
    private readonly usersService: UserService,
    private readonly prisma: PrismaService,
  ) {}

  async createChannelChats(content: string, reqUser: JwtPayloadDto) {
    const { provider, providerId } = reqUser;
    this.logger.verbose(`msg: ${content}, user: ${provider}-${providerId}`);
    const user = await this.usersService.findOne({
      provider_providerId: {
        provider,
        providerId,
      },
    });
    const { username, thumbnailImage } = user;
    this.eventsGateway.server.emit('chat', {
      provider,
      providerId,
      username,
      thumbnailImage,
      msg: content,
    });
    await this.prisma.chat.create({
      data: {
        message: content,
        senderId: user.id,
      },
    });
  }
}
