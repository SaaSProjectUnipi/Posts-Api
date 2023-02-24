import {IsNotEmpty, IsOptional} from 'class-validator';

export class GroupCreateDto {
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  ownerId?: string;
}
