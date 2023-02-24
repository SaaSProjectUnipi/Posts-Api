import { PostEntity } from './post.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  BeforeInsert, ManyToMany, JoinTable,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import {GroupEntity} from "./group.entity";

@Entity({schema: "posts"})
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  username?: string;

  @Column({ type: 'varchar', nullable: false, select: false })
  password?: string;

  @Column({ type: 'varchar', nullable: true, unique: true })
  firstname?: string;

  @Column({ type: 'varchar', nullable: true })
  lastname?: string;

  @Column({ type: 'varchar', nullable: false })
  email?: string;

  @CreateDateColumn()
  createdOn?: Date;

  @CreateDateColumn()
  updatedOn?: Date;

  @OneToMany(type => PostEntity, post => post.user)
  posts?: PostEntity[];

  @ManyToMany(() => GroupEntity, group => group.users)
  @JoinTable()
  groups?: GroupEntity[];

  @ManyToMany(() => UserEntity)
  @JoinTable()
  contacts?: UserEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password!, 10);
  }
}