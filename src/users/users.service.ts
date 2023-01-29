import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';

@Injectable()
export class UsersService {
  private users: UserDto[] = [];

  async findOne(provider: string, id: number): Promise<UserDto | undefined> {
    return this.users.find(
      (user) => user.provider === provider && user.id === id,
    );
  }

  async create(userData: UserDto) {
    this.users.push(userData);
  }
}
