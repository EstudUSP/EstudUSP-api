import 'reflect-metadata';
import { faker } from '@faker-js/faker';

import Question from '../question';
import Auth from '../auth';

import buildContainer from '../../../container';

describe('Question use cases', () => {
  let question: Question;
  let userToken: string;

  beforeAll(async () => {
    const container = await buildContainer();
    question = container.get(Question);
    const auth = container.get(Auth);

    const userData = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      profilePicture: faker.internet.url(),
    };

    const user = await auth.signUp(userData);
    userToken = user.token;
  });

  it('should be able to post a question', async () => {
    const questionData = {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      upvote: 0,
      anonymous: false,
      userToken: userToken,
      professor: faker.lorem.word(),
      attachments: [faker.internet.url(), faker.internet.url()],
      tags: ['oii', 'ok', 'boa noite'],
      subjectId: 'conduco',
    };

    await expect(question.post(questionData)).resolves.not.toThrow();
  });
});
