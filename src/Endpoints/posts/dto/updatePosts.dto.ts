import { IsNotEmpty, IsOptional } from 'class-validator';
import { UserDto } from '../../users/dto/user.dto';

export class UpdatePostsDto {
  @IsNotEmpty()
  @IsOptional()
  id!: string;

  @IsOptional()
  name?: string;

  @IsOptional()
  createdOn?: Date;

  @IsOptional()
  description?: string;


}
