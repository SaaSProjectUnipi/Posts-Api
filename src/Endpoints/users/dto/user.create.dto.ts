import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username?: string;

  @IsNotEmpty()
  firstname?: string;

  @IsNotEmpty()
  lastname?: string;

  @IsNotEmpty()
  password?: string;

  @IsNotEmpty()
  @IsEmail()
  email?: string;
}
