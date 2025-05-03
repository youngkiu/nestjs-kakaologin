import { Module } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt/jwt.auth.guard';
import { PrismaModule } from '../prisma/prisma.module';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, JwtAuthGuard],
  exports: [UserService],
})
export class UserModule {}
