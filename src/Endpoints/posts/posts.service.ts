import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { GroupEntity } from '../../TypeOrm/Entities/group.entity';
import { UpdatePostsDto } from './dto/updatePosts.dto';
import { CreatePostDto } from './dto/createPosts.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';
import {postRepository} from "../../TypeOrm/Repositories/post.repository";
import {groupRepository} from "../../TypeOrm/Repositories/group.repository";
import {userRepository} from "../../TypeOrm/Repositories/user.repository";

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  async getAllGroupPosts(user: any,groupId: string) {
    const posts = await postRepository.find({
      where: {
        groupId: groupId,
        userId : user.id
      }
    });

    const userInDb = await userRepository.findOne({
      where:{
        id: user.id
      },
      relations:{
        groups: true
      }

    })
    console.log(userInDb)

    if(!userInDb!.groups?.some(group => group.id === groupId)){
      throw new HttpException(
          `You are not part of this group`,
          HttpStatus.BAD_REQUEST,
      );
    }

    return posts;
  }

  async getPostById(id: string) {
    const post = await postRepository.findOne({
      where: { id },
      relations:{
        user: true,
        group: true
      }
    });

    if (!post) {
      throw new HttpException(
        `Post item doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return post;
  }

  async createPost(
    userDto: UserDto,
    createPostDto: CreatePostDto,
  ) {



    const user = await userRepository.findOne({ where: { id: userDto.id },relations: {groups: true}  });
    if(!user){
      throw new HttpException(
          `User doesn't exist`,
          HttpStatus.BAD_REQUEST,
      );
    }
    createPostDto.userId = user.id

    let group = await groupRepository.findById(createPostDto.groupId)
    if(!group){
      throw new HttpException(
          `Group is invalid`,
          HttpStatus.BAD_REQUEST,
      );
    }

    if(!user.groups?.some(group => group.id === group.id)){
      throw new HttpException(
          `You are not part of this group`,
          HttpStatus.BAD_REQUEST,
      );
    }

    const post = await postRepository.create(createPostDto)

    await  postRepository.save(post)
    return post

  }

  async updatePost(userId: string,id: string, postsDto: UpdatePostsDto) {

    let post = await postRepository.findOne({ where: { id } });

    if (!post) {
      throw new HttpException(
        `Post doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if(post.userId !== userId){
      throw new HttpException(
          `This is not your post to edit it.`,
          HttpStatus.BAD_REQUEST,
      );
    }

    await postRepository.update({ id }, postsDto); // update

    post = await postRepository.findOne({
      where: { id },
      relations:{
        user: true,
        group: true
      }
    });

    return post;
  }

  async deletePost(id: string){
    const todo = await postRepository.findOne({
      where: { id }
    });

    if (!todo) {
      throw new HttpException(
        `Post doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await postRepository.delete({ id }); // delete posts list

  }
}
