import { Controller, Get, Logger, Session } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Session() session: Record<string, any>): string {
    this.logger.debug({ session });
    return this.appService.getHello();
  }
}
