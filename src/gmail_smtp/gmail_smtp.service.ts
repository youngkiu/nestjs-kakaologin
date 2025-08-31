import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class GmailSmtpService {
  private readonly logger = new Logger(GmailSmtpService.name);
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('GMAIL_USER'),
        pass: this.configService.get<string>('GMAIL_APP_PASSWORD'),
      },
    });
  }

  async send(mailOptions: nodemailer.SendMailOptions) {
    const result = await this.transporter.sendMail(mailOptions);

    this.logger.log(`Email successfully dispatched to ${mailOptions.to}`);
    return result;
  }

  async sendLogin(email: string) {
    if (!email) {
      this.logger.warn('No Email Address');
      return;
    }
    const mailOptions = {
      to: email,
      subject: 'Greeting Message from NestJS Gmail',
      from: this.configService.get<string>('GMAIL_USER'),
      text: 'Hello World from NestJS Gmail',
      html: '<h1>Hello World from NestJS Gmail</h1>',
    };
    await this.send(mailOptions);
  }
}
