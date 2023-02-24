import { GroupEntity } from '../Entities/group.entity';
import { AppDataSource } from '../data-source';

export const groupRepository = AppDataSource.getRepository(GroupEntity).extend({
  findById(id: string) {
    return this.findOne({
      where: { id }
    });
  },
  getAll() {
    return this.find();
  },
})