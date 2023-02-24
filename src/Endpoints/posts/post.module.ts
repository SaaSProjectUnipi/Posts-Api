import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { GroupsController } from '../groups/groups.controller';
import { GroupService } from '../groups/group.service';
import { GroupEntity } from '../../TypeOrm/Entities/group.entity';
import { PostEntity } from '../../TypeOrm/Entities/post.entity';
import { UserEntity } from '../../TypeOrm/Entities/user.entity';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule,
  ],
  controllers: [PostsController, GroupsController],
  providers: [PostsService, GroupService],
})
export class PostModule {}
