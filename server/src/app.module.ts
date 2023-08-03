import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';
import { MailModule } from './mail/mail.module';
import { AuthConfirmationsModule } from './auth-confirmations/auth-confirmations.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ProfileModule,
    MailModule,
    AuthConfirmationsModule,
  ],
})
export class AppModule {}
