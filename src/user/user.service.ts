import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // https://docs.nestjs.com/recipes/prisma#use-prisma-client-in-your-nestjs-services
  async findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    // https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/mongodb/querying-the-database-typescript-mongodb#write-data-into-the-database
    return this.prisma.user.create({
      data,
    });
  }
}
