import { Injectable, Logger } from '@nestjs/common';
import { EventsGateway } from '../events/events.gateway';
import { JwtPayloadDto } from '../auth/jwt.payload.dto';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(private readonly eventsGateway: EventsGateway) {}
  createChannelChats(content: string, reqUser: JwtPayloadDto) {
    const { provider, id } = reqUser;
    this.logger.debug(`msg: ${content}, user: ${provider}-${id}`);
    this.eventsGateway.server.emit('chat', { msg: content });
  }
}
