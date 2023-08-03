import { IsString, IsNotEmpty } from 'class-validator';

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
