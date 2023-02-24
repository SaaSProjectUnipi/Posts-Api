import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from '../../TypeOrm/Entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule],
  controllers: [],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
