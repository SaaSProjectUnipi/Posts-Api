import {IsNotEmpty, IsOptional, IsString} from 'class-validator';

export class GroupUpdateDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  userId?: string;
}