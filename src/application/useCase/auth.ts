import { inject, injectable } from 'inversify';
import User, { IUser } from '../../domain/entity/user';
import SessionService from '../../domain/service/session';
import UserRepository from '../../infra/db/repository/user';

@injectable()
class Auth {
  constructor(
    @inject(SessionService) private readonly sessions: SessionService,
    @inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  async signUp(name: string, email: string, password: string) {
    const userData: IUser = {
      name,
      email,
      password,
    };

    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw new Error('Already exists an user with that email');
    }

    const user = await this.userRepository.create(userData);

    return this.auth(user);
  }

  async signIn(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('Invalid email');
    }

    if (user.password !== password) {
      throw new Error('Invalid password');
    }

    return this.auth(user);
  }

  private auth(user: User): string {
    const token = user.getToken();
    this.sessions.set(token, user);

    return token;
  }
}

export default Auth;
