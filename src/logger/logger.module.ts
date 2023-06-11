import { Module } from '@nestjs/common';

import { MyLoggerService } from './logger.service';

@Module({
  providers: [MyLoggerService],
  exports: [MyLoggerService],
})
export class LoggerModule {}
