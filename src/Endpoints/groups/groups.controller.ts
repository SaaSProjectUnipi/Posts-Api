import {
  Controller,
  Param,
  Get,
  Post,
  Body,
  Delete,
  UsePipes,
  UseGuards, ValidationPipe, Req, Put,
} from '@nestjs/common';
import { GroupService } from './group.service';

import { GroupCreateDto } from './dto/groupCreate.dto';
import { AuthGuard } from '@nestjs/passport';
import {UserDto} from "../users/dto/user.dto";
import {UpdatePostsDto} from "../posts/dto/updatePosts.dto";

@UsePipes(new ValidationPipe({transform: true}))
@Controller('groups')
export class GroupsController {
  constructor(private groupService: GroupService) {}


  @UseGuards(AuthGuard())
  @Get('/all')
  async getAllGroups( @Req() req: any) {
    const user = req.user as UserDto;

    return await this.groupService.getAllGroups();
  }

  @UseGuards(AuthGuard())
  @Get('')
  async getMyGroups( @Req() req: any) {
    const user = req.user as UserDto;

    return await this.groupService.getMyGroups(user.id);
  }

  @Get(':id')
  async getGroupById(@Param('id') id: string) {
    const group = await this.groupService.getGroupById(id);
    return group;
  }

  @Get(':id/join')
  @UseGuards(AuthGuard())
  async joinGroup(
      @Param('id') id: string,
      @Req() req: any,
  ) {

    const user = req.user as UserDto;
    console.log(user)
    const join = await this.groupService.joinGroup(user,id);
    return join;
  }

  @Post('')
  @UseGuards(AuthGuard())
  async create(
    @Body() groupCreateDto: GroupCreateDto,
    @Req() req: any,
  ) {
    const user = req.user as UserDto;
    return await this.groupService.createGroup(user, groupCreateDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async update(
      @Param('id') id: string,
      @Body() updatePostsDto: UpdatePostsDto,
      @Req() req: any,
  ) {
    const user = req.user as UserDto;

    return await this.groupService.updateGroup(user,id, updatePostsDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async delete(
      @Param('id') id: string,
      @Req() req: any,
  ) {
    const user = req.user as UserDto;
    await this.groupService.deleteGroup(user,id);
  }
}
