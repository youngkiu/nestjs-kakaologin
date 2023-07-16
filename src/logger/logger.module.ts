import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { MyLoggerService } from './logger.service';

@Module({
  imports: [HttpModule],
  providers: [MyLoggerService],
  exports: [MyLoggerService],
})
export class LoggerModule {}
