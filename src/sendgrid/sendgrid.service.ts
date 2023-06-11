import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class SendgridService {
  private readonly logger = new Logger(SendgridService.name);

  constructor(private readonly configService: ConfigService) {
    SendGrid.setApiKey(this.configService.get<string>('SENDGRID_API_KEY'));
  }

  async send(mail: SendGrid.MailDataRequired) {
    const transport = await SendGrid.send(mail);

    this.logger.log(`Email successfully dispatched to ${mail.to}`);
    return transport;
  }

  async sendLogin(email: string) {
    if (!email) {
      this.logger.warn('No Email Address');
      return;
    }
    const mail = {
      to: email,
      subject: 'Greeting Message from NestJS Sendgrid',
      from: this.configService.get<string>('SENDGRID_EMAIL_ADDRESS'),
      text: 'Hello World from NestJS Sendgrid',
      html: '<h1>Hello World from NestJS Sendgrid</h1>',
    };
    await this.send(mail);
  }
}
