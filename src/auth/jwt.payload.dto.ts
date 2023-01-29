import { PickType } from '@nestjs/swagger';
import { UserDto } from '../users/user.dto';

export class JwtPayloadDto extends PickType(UserDto, [
  'provider',
  'id',
  'username',
] as const) {}
