import { inject, injectable } from 'inversify';
import UserEntity, { IUser } from '../../../domain/entity/user';

import { User as UserSchema } from '../schema/user';

import { DataSource, Repository } from 'typeorm';

@injectable()
class UserRepository {
  repository: Repository<UserSchema>;

  constructor(
    @inject(DataSource) private readonly db: DataSource,
  ) {
    this.repository = this.db.getRepository(UserSchema);
  }

  async create(params: IUser): Promise<UserEntity> {
    const { email, password, picture_link, name } = params;

    const user = new UserSchema();

    user.email = email;
    user.password = password;
    user.name = name;

    if (picture_link) {
      user.picture_link = picture_link;
    }

    await this.repository.save(user);

    const userEntity = new UserEntity(params);

    return userEntity;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    try {
      const user = await this.repository.findOneBy({ email });

      if (!user) return null;

      const userEntity = new UserEntity(user);

      return userEntity;
    } catch (err) {
      return null;
    }
  }
}

export default UserRepository;
