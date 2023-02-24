import { IsNotEmpty, MaxLength, IsOptional } from 'class-validator';
import { UserDto } from '../../users/dto/user.dto';

export class CreatePostDto {
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @MaxLength(1000)
  description?: string;

  @IsOptional()
  groupId!: string;

  @IsOptional()
  userId!: string;
}
