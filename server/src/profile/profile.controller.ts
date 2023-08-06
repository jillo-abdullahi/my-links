import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { GetProfileDTO, UpdateProfileDTO } from './dto';
import { JwtGuard } from '../auth/guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get(':username')
  @ApiResponse({
    status: 200,
    description: 'User profile successfully retrieved',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  getProfile(@Param() user: GetProfileDTO) {
    return this.profileService.getProfile(user);
  }

  @Patch()
  @ApiResponse({
    status: 200,
    description: 'User profile successfully updated',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({
    status: 401,
    description: 'User is not authorized to update this profile',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @UseGuards(JwtGuard)
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <access_token>',
    required: true,
  })
  @ApiBearerAuth('access-token')
  @ApiBody({
    type: UpdateProfileDTO,
    description: 'Update profile',
  })
  updateProfile(@Req() req: any) {
    const { body, user } = req;
    return this.profileService.updateProfile(body, user.sub);
  }
}
