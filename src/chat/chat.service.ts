import { Injectable, Logger } from '@nestjs/common';
import { EventsGateway } from '../events/events.gateway';
import { JwtPayloadDto } from '../auth/jwt.payload.dto';
import { UserDto } from '../users/user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(
    private readonly eventsGateway: EventsGateway,
    private readonly usersService: UsersService,
  ) {}

  async createChannelChats(content: string, reqUser: JwtPayloadDto) {
    const { provider, id } = reqUser;
    this.logger.debug(`msg: ${content}, user: ${provider}-${id}`);
    const userData: UserDto = await this.usersService.findOne(provider, id);
    const { username, thumbnailImage } = userData;
    this.eventsGateway.server.emit('chat', {
      provider,
      id,
      username,
      thumbnailImage,
      msg: content,
    });
  }
}
