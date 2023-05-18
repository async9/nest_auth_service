import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @IsString()
  @MinLength(2)
  username: string;

  @IsString()
  @MinLength(2)
  firstName: string;

  @IsString()
  @MinLength(2)
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
