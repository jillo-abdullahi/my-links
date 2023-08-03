import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { GetProfileDTO, UpdateProfileDTO } from './dto';
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)
@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get()
  getProfile(@Body() body: GetProfileDTO) {
    return this.profileService.getProfile(body);
  }

  @Patch()
  updateProfile(@Body() body: UpdateProfileDTO, @Req() req: any) {
    return this.profileService.updateProfile(body, req);
  }
}
