import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetProfileDTO, UpdateProfileDTO } from './dto';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  // get user profile
  async getProfile(body: GetProfileDTO) {
    try {
      const { userId } = body;
      const profile = await this.prisma.profile.findUnique({
        where: {
          userId,
        },
      });

      if (!profile) {
        throw new NotFoundException('Profile not found');
      }

      return profile;
    } catch (error) {
      throw error;
    }
  }

  // update user profile
  async updateProfile(body: UpdateProfileDTO, req: any) {
    const { userId } = body;

    // only allow user to update their own profile
    // we're using the userId from the decoded jwt token
    // see validate() method in /auth/strategy/jwt.strategy.ts
    const loggedInUserId = req.user.sub;
    if (loggedInUserId !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to update this profile',
      );
    }

    try {
      const profile = await this.prisma.profile.update({
        where: {
          userId,
        },
        data: body,
      });

      return profile;
    } catch (error) {
      throw new Error(`Error updating profile: ${error.message}`);
    }
  }
}
