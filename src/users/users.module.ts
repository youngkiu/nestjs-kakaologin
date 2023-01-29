import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService, JwtAuthGuard],
  exports: [UsersService],
  controllers: [UserController],
})
export class UsersModule {}
