import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  // password reset
  async sendPasswordResetEmail(
    userEmail: string,
    username: string,
    url: string,
  ) {
    try {
      await this.mailerService.sendMail({
        to: userEmail,
        subject: 'DevLinks: Password Reset',
        template: './passwordReset', // `.hbs` extension is appended automatically
        context: {
          username,
          url,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  // email confirmation
  async sendConfirmationEmail(
    userEmail: string,
    username: string,
    url: string,
  ) {
    try {
      await this.mailerService.sendMail({
        to: userEmail,
        subject: 'DevLinks: Confirm your email',
        template: './confirmEmail', // `.hbs` extension is appended automatically
        context: {
          username,
          url,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
