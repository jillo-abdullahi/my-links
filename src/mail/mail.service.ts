import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendPasswordResetEmail(userEmail: string, url: string) {
    try {
      await this.mailerService.sendMail({
        to: userEmail,
        subject: 'DevLinks Password Reset',
        template: './passwordReset', // `.hbs` extension is appended automatically
        context: {
          // ✏️ filling curly brackets with content
          url,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
