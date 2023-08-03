import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class ForgotPwdDTO {
  @IsString()
  @IsNotEmpty()
  email: string;
}

export class ResetPwdDTO {
  @IsString()
  @IsNotEmpty()
  password: string;
}
