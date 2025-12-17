import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class NesMailerService {
  constructor(private readonly mailerService: MailerService) {}

  async sendOtpEmail(email: string, otp: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: "One Time Password",
      template: "index",
      context: { code: otp }
    })
  }
}

