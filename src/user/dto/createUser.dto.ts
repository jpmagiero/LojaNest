import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { UniqueEmail } from '../validator/uniqueEmailValidator';

export class CreateUserDTO {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @UniqueEmail({ message: 'There is already a user with that email' })
  email: string;

  @MinLength(6)
  password: string;
}
