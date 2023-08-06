import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class RegisterDTO extends AuthDTO {
  @IsNotEmpty()
  @IsString()
  username: string;
}

export class ResendConfirmEmailDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class CheckUsernameDTO {
  @IsNotEmpty()
  @IsString()
  username: string;
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
