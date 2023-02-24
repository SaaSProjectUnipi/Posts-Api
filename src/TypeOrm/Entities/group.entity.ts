import { PostEntity } from './post.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinTable, ManyToMany, OneToOne, JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
@Entity({schema: "posts"})
export class GroupEntity {
  @PrimaryGeneratedColumn('uuid') id!: string;

  @Column({ type: 'varchar', nullable: false })
  name?: string;
  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'varchar', nullable: false })
  ownerId?: string;



  @ManyToOne(type => UserEntity)
  owner?: UserEntity

  @ManyToMany(type => UserEntity , user => user.groups, {onDelete: "CASCADE"})
  users?: UserEntity[];

  @OneToMany(type => PostEntity, post => post.group,{onDelete: "CASCADE"})
  posts?: PostEntity[];
}
