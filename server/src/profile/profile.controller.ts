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

@UseGuards(JwtGuard)
@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get(':username')
  getProfile(@Param() user: GetProfileDTO) {
    return this.profileService.getProfile(user);
  }

  @Patch()
  updateProfile(@Body() body: UpdateProfileDTO, @Req() req: any) {
    return this.profileService.updateProfile(body, req);
  }
}
