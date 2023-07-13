import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class createUserDTO {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}
