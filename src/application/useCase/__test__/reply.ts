import 'reflect-metadata';
import { faker } from '@faker-js/faker';

import Question from '../question';
import Reply from '../reply';
import Auth from '../auth';

import buildContainer from '../../../container';

describe('Reply use cases', () => {
  let question: Question;
  let reply: Reply;
  let userToken: string;

  beforeAll(async () => {
    const container = await buildContainer();
    question = container.get(Question);
    reply = container.get(Reply);
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

  it('should be able to add a reply to a question', async () => {
    const questions = await question.list();

    const questionId = questions[0].id;

    const replyData = {
      anonymous: false,
      content: faker.lorem.paragraph(),
      attachments: [faker.internet.url(), faker.internet.url()],
      userToken,
    };

    await expect(reply.replyTo(questionId, replyData)).resolves.not.toThrow();
  });
});
