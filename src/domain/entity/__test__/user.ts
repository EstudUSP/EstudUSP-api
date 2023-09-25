import jwt from 'jsonwebtoken';
import { faker } from '@faker-js/faker';

import User, { IUser } from '../user';

describe('User Class', () => {
  const userData: IUser = {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    profilePicture: faker.internet.url(),
  };

  it('should create a User instance', () => {
    const user = new User(userData);

    expect(user).toBeDefined();
    expect(user.name).toBe(userData.name);
    expect(user.email).toBe(userData.email);
    expect(user.password).toBe(userData.password);
    expect(user.profilePicture).toBe(userData.profilePicture);
  });

  it('should generate a valid token', () => {
    const user = new User(userData);
    const token = user.token;

    expect(token).toBeDefined();
    expect(typeof token).toBe('string');

    const decodedToken = jwt.verify(token, 'test');
    expect(decodedToken).toHaveProperty('email', user.email);
    expect(decodedToken).toHaveProperty('password', user.password);
  });

  it('should reuse the same token for multiple calls', () => {
    const user = new User(userData);

    const token1 = user.token;
    const token2 = user.token;

    expect(token1).toBe(token2);
  });
});
