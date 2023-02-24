import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { GroupEntity } from './group.entity';
import {UserEntity} from "./user.entity";

@Entity({schema: "posts"})
export class PostEntity {
  @PrimaryGeneratedColumn('uuid') id!: string;

  @Column({ type: 'varchar', nullable: false })
  title?: string;

  @Column({ type: 'varchar', nullable: false })
  description?: string;

  @Column({ type: 'varchar', nullable: false })
  groupId?: string;
  @Column({ type: 'varchar', nullable: false })
  userId?: string;


  @CreateDateColumn()
  createdOn?: Date;

  @ManyToOne(type => GroupEntity, group => group.posts)
  group?: GroupEntity;

  @ManyToOne(type => UserEntity, user => user.posts)
  user?: UserEntity;
}
