import { Module } from '@nestjs/common';
import { AuthConfirmationsService } from './auth-confirmations.service';
import { AuthConfirmationsController } from './auth-confirmations.controller';
import { JwtAuthService } from 'src/auth/jwtUtils';
import { MailModule } from '../mail/mail.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({}), MailModule],
  providers: [AuthConfirmationsService, JwtAuthService],
  controllers: [AuthConfirmationsController],
})
export class AuthConfirmationsModule {}
