import { AppDataSource } from '../data-source';
import { GroupEntity } from '../Entities/group.entity';
import { PostEntity } from '../Entities/post.entity';

export const postRepository = AppDataSource.getRepository(PostEntity).extend({
  findById(id: string) {
    return this.findOne({
      where: { id }
    });
  },
  getAll() {
    return this.find();
  },
})