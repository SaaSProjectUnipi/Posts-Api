import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { GroupCreateDto } from './dto/groupCreate.dto';
import { PostEntity } from '../../TypeOrm/Entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupEntity } from '../../TypeOrm/Entities/group.entity';
import { postRepository } from '../../TypeOrm/Repositories/post.repository';
import {UserDto} from "../users/dto/user.dto";
import {CreatePostDto} from "../posts/dto/createPosts.dto";
import {UpdatePostsDto} from "../posts/dto/updatePosts.dto";
import {groupRepository} from "../../TypeOrm/Repositories/group.repository";
import {userRepository} from "../../TypeOrm/Repositories/user.repository";
import {GroupUpdateDto} from "./dto/groupUpdate";

@Injectable()
export class GroupService {
  constructor(

  ) {}

  async getAllGroups() {
    const groups = await groupRepository.find({
      relations:{
        owner: true,
        users: true
      }
    });

    return groups;
  }


  async getMyGroups(userid: string) {
    const groups = await groupRepository.find({
      where: {
        users:{
          id: userid
        }
      },
      relations:{
        owner: true,
        users: true
      }
    });

    return groups;
  }

  async getGroupById(id: string) {
    const group = await groupRepository.findOne({
      where: { id },
      relations:{
        owner: true,
        posts: true,
        users:true
      }
    });

    if (!group) {
      throw new HttpException(
          `Group doesn't exist`,
          HttpStatus.BAD_REQUEST,
      );
    }

    return group;
  }

  async createGroup(
      userDto: UserDto,
      groupCreateDto: GroupCreateDto,
  ) {

    const user = await userRepository.findOne({ where: { id: userDto.id } });
    if(!user){
      throw new HttpException(
          `User doesn't exist`,
          HttpStatus.BAD_REQUEST,
      );
    }
    groupCreateDto.ownerId = user.id

    const group = await groupRepository.create(groupCreateDto)

    group!.users = [user]

    await  groupRepository.save(group)
    return group

  }

  async updateGroup(userDto: UserDto,id: string, groupDto: GroupUpdateDto) {


    let group = await groupRepository.findOne({ where: { id } });

    if (!group) {
      throw new HttpException(
          `Group doesn't exist`,
          HttpStatus.BAD_REQUEST,
      );
    }
    if(group.ownerId !== userDto.id){
      throw new HttpException(
          `This isn't your group to edit it!`,
          HttpStatus.FORBIDDEN,
      );
    }


    await groupRepository.update({ id }, groupDto); // update

    group = await groupRepository.findOne({
      where: { id },
      relations:{
        owner: true,
        posts: true,
        users:true
      }
    });

    return group;
  }

  async deleteGroup(userDto: UserDto,id: string){
    const group = await groupRepository.findOne({
      where: { id }
    });

    if (!group) {
      throw new HttpException(
          `Group doesn't exist`,
          HttpStatus.BAD_REQUEST,
      );
    }

    if(group.ownerId !== userDto.id){
        let user = await userRepository.findOne({
          where:{
            id: userDto.id
          }
        })

      if(user){
       user.groups = user.groups?.filter(item => item.id !== group.id)
        await userRepository.save(user)
      }
    }else{
      await groupRepository.delete({ id }); // delete posts list
    }


  }

  async joinGroup(userDto: UserDto,id: string){
    const group = await groupRepository.findOne({
      where: { id },
      relations: {
        users: true,
        owner: true,
        posts: true
      }
    });

    if (!group) {
      throw new HttpException(
          `Group doesn't exist`,
          HttpStatus.BAD_REQUEST,
      );
    }


    const user = await userRepository.findById(userDto.id)


    if(!group.users?.some(userIn => userIn.id === user!.id)){
      group.users?.push(user!)
    }else {
      throw new HttpException(
          `You are already member of that group`,
          HttpStatus.BAD_REQUEST,
      );
    }
    await groupRepository.save(group)
  }

}
