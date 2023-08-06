import { Body, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  AuthDTO,
  CheckUsernameDTO,
  RegisterDTO,
  ResendConfirmEmailDTO,
} from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ConfigService } from '@nestjs/config';

import { MailService } from '../mail/mail.service';
import { JwtAuthService } from './jwtUtils';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
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
  async signup(body: RegisterDTO) {
    let hashPassword;
    const { username, email, password } = body;

    // check if username already exists
    const usernameExists = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (usernameExists) {
      throw new ForbiddenException('Username already exists');
    }

    try {
      hashPassword = await argon.hash(password);
    } catch (error) {
      throw new Error(`Error hashing password: ${error.message}`);
    }

    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          username,
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
        throw new Error(`Error saving confirmation token: ${error.message}`);
      }

      // send confirmation email
      const confirmUrl = `${this.config.get(
        'CLIENT_BASE_URL',
      )}/auth/confirm-email?token=${confirmToken}`;

      try {
        await this.mailerService.sendConfirmationEmail(
          user.email,
          user.username,
          confirmUrl,
        );
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
   * re-send confirmation email
   * @param email
   * @returns message
   * */
  async resendConfirmationEmail(body: ResendConfirmEmailDTO) {
    const { email } = body;
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    // if user is already confirmed
    if (user.confirmed) {
      throw new ForbiddenException('User already confirmed');
    }

    // check if confirmation token exists
    // if it does, delete it and create a new one
    const token = await this.prisma.confirmationToken.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (token) {
      await this.prisma.confirmationToken.delete({
        where: {
          id: token.id,
        },
      });
    }

    const confirmToken = await this.jwtAuthService.signToken(
      user.id,
      user.email,
    );

    // save confirmation token to db
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
      throw new Error(`Error saving confirmation token: ${error.message}`);
    }

    // send confirmation email
    const confirmUrl = `${this.config.get(
      'CLIENT_BASE_URL',
    )}/auth/confirm-email?token=${confirmToken}`;

    try {
      await this.mailerService.sendConfirmationEmail(
        user.email,
        user.username,
        confirmUrl,
      );
      return {
        message: 'Confirmation email sent',
      };
    } catch (error) {
      throw new Error(`Error sending user email: ${error.message}`);
    }
  }

  /**
   * check username
   * @param username
   * @returns boolean
   * */
  async checkUsername(@Body() body: CheckUsernameDTO) {
    const { username } = body;

    try {
      const user = await this.prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (user) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }
}
