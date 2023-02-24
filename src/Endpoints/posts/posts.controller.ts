import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UsePipes,
  UseGuards,
  Req, ValidationPipe,
} from '@nestjs/common';
import { UpdatePostsDto } from './dto/updatePosts.dto';
import { CreatePostDto } from './dto/createPosts.dto';
import { PostsService } from './posts.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from '../users/dto/user.dto';


@UsePipes(new ValidationPipe({transform: true}))
@Controller('/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/group/:id')
  @UseGuards(AuthGuard())
  async findAll(@Req() req: any,@Param('id') id: string) {
    let user = req.user as UserDto
    const todos = await this.postsService.getAllGroupPosts(user,id);
    return todos;
  }


  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.postsService.getPostById(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  async create(
    @Body() createPostDto: CreatePostDto,
    @Req() req: any,
  ) {
    const user = req.user as UserDto;
    return await this.postsService.createPost(user, createPostDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async update(
    @Param('id') id: string,
    @Body() updatePostsDto: UpdatePostsDto,
    @Req() req: any,

  ) {
    const user = req.user as UserDto;

    return await this.postsService.updatePost(user.id,id, updatePostsDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async delete(@Param('id') id: string) {
     await this.postsService.deletePost(id);
  }
}
