import 'reflect-metadata';
import { faker } from '@faker-js/faker';

import Auth from '../auth';
import { IUser } from '../../../domain/entity/user';

import buildContainer from '../../../container';

describe('Auth use cases', () => {
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
      profilePicture: faker.internet.url(),
    };

    await expect(auth.signUp(userData)).resolves.not.toThrow();
  });

  it('should sign in a user', async () => {
    await expect(auth.signIn(userData.email, userData.password)).resolves.not.toThrow();
  });

  it('should throw an error for invalid password during sign in', async () => {
    const email = userData.email;
    const password = 'wrongpassword';

    await expect(auth.signIn(email, password)).rejects.toThrow('Invalid password');
  });
});
