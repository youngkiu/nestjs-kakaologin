import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, JwtAuthGuard, PrismaService],
  exports: [UserService],
})
export class UserModule {}
