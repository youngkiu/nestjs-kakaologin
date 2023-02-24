import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class SendgridService {
  private readonly logger = new Logger(SendgridService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly mailService: MailerService,
  ) {}

  async sendLogin(toEmail: string) {
    if (!toEmail) {
      this.logger.warn('No Email Address');
      return;
    }

    const response = await this.mailService.sendMail({
      to: toEmail,
      from: this.configService.get<string>('SENDGRID_EMAIL_ADDRESS'),
      subject: 'Plain Text Email ✔',
      text: 'Welcome NestJS Email Sending Tutorial',
    });
    this.logger.log(`Email successfully dispatched to ${toEmail}`);
    return response;
  }
}
