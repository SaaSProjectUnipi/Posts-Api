import { Module, DynamicModule } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PostModule } from './Endpoints/posts/post.module.js';
import { UsersModule } from './Endpoints/users/users.module.js';
import { AuthModule } from './Endpoints/auth/auth.module.js';
import { APP_FILTER } from '@nestjs/core';
import { ErrorHandler } from './Utils/ExeptionFilter/ErrorHandler.js';
import { TypeOrmModule } from './TypeOrm/TypeOrm.module.js';

@Module({
  controllers: [AppController],
  imports: [
    AuthModule,
    UsersModule,
    PostModule,
    TypeOrmModule,
  ],
  providers: [AppService,
    {
      provide: APP_FILTER,
      useClass: ErrorHandler,
    }
  ]
})

export class AppModule {

}
