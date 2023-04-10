import { PickType } from '@nestjs/swagger';
import { UserDto } from '../user/user.dto';

export class JwtPayloadDto extends PickType(UserDto, [
  'provider',
  'providerId',
] as const) {}
