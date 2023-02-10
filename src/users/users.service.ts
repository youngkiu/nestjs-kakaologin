import { Injectable, Logger } from '@nestjs/common';
import { UserDto } from './user.dto';

const users: UserDto[] = [];

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  async findOne(provider: string, id: number): Promise<UserDto | undefined> {
    return users.find((user) => user.provider === provider && user.id === id);
  }

  async create(userData: UserDto) {
    users.push(userData);
    this.logger.debug({ ...userData, num: users.length });
  }
}
