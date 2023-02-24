import { AppDataSource } from '../data-source';
import { GroupEntity } from '../Entities/group.entity';
import { UserEntity } from '../Entities/user.entity';

export const userRepository = AppDataSource.getRepository(UserEntity).extend({
  findById(id: string) {
    return this.findOne({
      where: { id }
    });
  },
  getAll() {
    return this.find();
  },
})