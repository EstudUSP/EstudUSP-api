import { inject, injectable } from 'inversify';
import { DataSource, Repository } from 'typeorm';

import UserEntity, { IUser } from '../../../domain/entity/user';
import { User as UserSchema } from '../schema/user';

@injectable()
class UserRepository {
  repository: Repository<UserSchema>;

  constructor(
    @inject(DataSource) private readonly db: DataSource,
  ) {
    this.repository = this.db.getRepository(UserSchema);
  }

  async create(params: IUser): Promise<UserEntity> {
    const { email, password, profilePicture, name } = params;

    const user = new UserSchema();

    user.email = email;
    user.password = password;
    user.name = name;

    if (profilePicture) {
      user.profilePicture = profilePicture;
    }

    const newUser = await this.repository.save(user);

    const userEntity = new UserEntity(newUser.id, params);

    return userEntity;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    try {
      const user = await this.repository.findOneBy({ email });

      if (!user) return null;

      const userEntity = new UserEntity(user.id, user);

      return userEntity;
    } catch (err) {
      return null;
    }
  }
}

export default UserRepository;
