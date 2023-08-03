import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDTO, ForgotPwdDTO, ResetPwdDTO } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { MailService } from '../mail/mail.service';
import { JwtAuthService } from './jwtUtils';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,

    // this service is used to sign and verify tokens
    private jwtAuthService: JwtAuthService,
    private config: ConfigService,
    private mailerService: MailService,
  ) {}

  /**
   * signin
   * @param body
   * @returns user object with access token
   */
  async signin(body: AuthDTO) {
    const { email, password } = body;

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    // user not found
    if (!user) {
      throw new ForbiddenException('Incorrect credentials');
    }

    try {
      if (await argon.verify(user.password, password)) {
        delete user.password;
        return {
          ...user,
          access_token: await this.jwtAuthService.signToken(
            user.id,
            user.email,
          ),
        };
      } else {
        // password did not match
        throw new ForbiddenException('Incorrect credentials');
      }
    } catch (error) {
      // internal failure
      throw error;
    }
  }

  /**
   * signup
   * @param body
   * @returns user object with access token
   * */
  async signup(body: AuthDTO) {
    let hashPassword;
    const { email, password } = body;
    try {
      hashPassword = await argon.hash(password);
    } catch (error) {
      throw new Error(`Error hashing password: ${error.message}`);
    }

    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          password: hashPassword,
          profile: {
            create: {}, // create empty profile for current user
          },
        },
      });

      // save confirmation token to db
      const confirmToken = await this.jwtAuthService.signToken(
        user.id,
        user.email,
      );

      try {
        await this.prisma.confirmationToken.create({
          data: {
            token: confirmToken,
            user: {
              connect: {
                id: user.id,
              },
            },
          },
        });
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code !== 'P2014') throw error;
          throw new ForbiddenException(
            'Confirmation token already exists for this user',
          );
        } else {
          throw error;
        }
      }

      // send confirmation email
      const confirmUrl = `${this.config.get(
        'CLIENT_BASE_URL',
      )}/auth/confirm-email?token=${confirmToken}`;

      try {
        await this.mailerService.sendConfirmationEmail(user.email, confirmUrl);
        delete user.password;
        return {
          ...user,
          access_token: await this.jwtAuthService.signToken(
            user.id,
            user.email,
          ),
        };
      } catch (error) {
        throw new Error(`Error sending user email: ${error.message}`);
      }
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already exists');
        } else {
          throw error;
        }
      } else {
        throw error;
      }
    }
  }

  /**
   * Confirm email
   * @param token
   * @returns user object with message
   * */
  async confirmEmail(token: string) {
    // check if token exists
    const tokenExists = await this.prisma.confirmationToken.findUnique({
      where: {
        token,
      },
    });

    if (!tokenExists) {
      throw new UnauthorizedException('Invalid confirmation token');
    }

    // verify token
    const decodedToken = await this.jwtAuthService.verifyToken(token);
    const { sub: id } = decodedToken;

    try {
      // check if user exists
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      // update user confirmed status
      await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          confirmed: true,
        },
      });

      // delete confirmation token
      await this.prisma.confirmationToken.delete({
        where: {
          token,
        },
      });
      delete user.password;
      return {
        ...user,
        confirmed: true,
        message: 'Email confirmed successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Forgot password. Generate reset token and send email
   * @param body
   * @returns message with email status
   * */
  async forgotPassword(body: ForgotPwdDTO) {
    // check if email exists
    const { email } = body;
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('Email not found');
    }

    // generate reset token
    const resetToken = await this.jwtAuthService.signToken(user.id, user.email);
    // save reset token to db

    try {
      await this.prisma.passwordResetToken.create({
        data: {
          token: resetToken,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code !== 'P2014') throw error;
        throw new ForbiddenException(
          'Reset token already exists for this user',
        );
      } else {
        throw error;
      }
    }

    // send email with reset token
    const resetUrl = `${this.config.get(
      'CLIENT_BASE_URL',
    )}/auth/reset-password?token=${resetToken}`;

    try {
      await this.mailerService.sendPasswordResetEmail(user.email, resetUrl);
      delete user.password;
      return {
        ...user,
        resetUrl,
        message: 'Reset email successfully sent',
      };
    } catch (error) {
      throw new Error(`Error sending user email: ${error.message}`);
    }
  }

  /**
   * Reset password
   * @param token
   * @param body
   * @returns user object with message
   * */
  async resetPassword(token: string, body: ResetPwdDTO) {
    // check if token exists
    const resetToken = await this.prisma.passwordResetToken.findUnique({
      where: {
        token,
      },
    });

    if (!resetToken) {
      throw new UnauthorizedException('Invalid reset token');
    }

    // verify token
    const decodedToken = await this.jwtAuthService.verifyToken(token);
    const { sub: id } = decodedToken;

    try {
      // check if user exists
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      // update password
      const hashedPassword = await argon.hash(body.password);
      await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          password: hashedPassword,
        },
      });

      // delete reset token
      await this.prisma.passwordResetToken.delete({
        where: {
          token,
        },
      });
      delete user.password;
      return { ...user, message: 'Password reset successfully' };
    } catch (error) {
      throw error;
    }
  }
}
