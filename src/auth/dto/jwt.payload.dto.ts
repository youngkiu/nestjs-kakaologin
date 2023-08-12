import { PickType } from '@nestjs/swagger';

import { CallbackUserDataDto } from './callback_user_data.dto';

export class JwtPayloadDto extends PickType(CallbackUserDataDto, [
  'provider',
  'providerId',
] as const) {}
