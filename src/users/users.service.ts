import { Injectable } from '@nestjs/common';
import { User } from './users.entities';

@Injectable()
export class UsersService {
  private users: User[] = [];

  async findOne(provider: string, id: number): Promise<User | undefined> {
    return this.users.find(
      (user) => user.provider === provider && user.id === id,
    );
  }

  async create(userData: User) {
    this.users.push(userData);
  }
}
