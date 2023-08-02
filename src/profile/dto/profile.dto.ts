import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateProfileDTO {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  profession?: string;

  @IsString()
  @IsOptional()
  profileImage?: string;

  @IsString()
  @IsOptional()
  backgroundImage?: string;

  @IsString()
  @IsOptional()
  githubLink?: string;

  @IsString()
  @IsOptional()
  personalWebsiteLink?: string;

  @IsString()
  @IsOptional()
  youtubeLink?: string;

  @IsString()
  @IsOptional()
  linkedinLink?: string;

  @IsString()
  @IsOptional()
  twitterLink?: string;

  @IsString()
  @IsOptional()
  facebookLink?: string;

  @IsString()
  @IsOptional()
  instagramLink?: string;
}

export class GetProfileDTO {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
