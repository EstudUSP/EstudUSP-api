import 'reflect-metadata';

import { faker } from '@faker-js/faker';

import Auth from '../auth';
import User, { IUser } from '../../../domain/entity/user';

import buildContainer from '../../../container';

describe('Auth', () => {
  let auth: Auth;
  let userData: IUser;

  beforeAll(async () => {
    const container = await buildContainer();
    auth = container.get(Auth);
  });

  it('should sign up a user', async () => {
    userData = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const user = new User(userData);
    const token = await auth.signUp(userData.name, userData.email, userData.password);

    expect(token).toEqual(user.getToken());
  });

  it('should sign in a user', async () => {
    const user = new User({
      ...userData
    });

    const token = await auth.signIn(userData.email, userData.password);

    expect(token).toEqual(user.getToken());
  });

  it('should throw an error for invalid password during sign in', async () => {
    const email = userData.email;
    const password = 'wrongpassword';

    await expect(auth.signIn(email, password)).rejects.toThrow('Invalid password');
  });
});
