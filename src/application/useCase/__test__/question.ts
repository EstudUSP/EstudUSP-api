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
      tags: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
      subjectId: 'conduco',
    };

    await expect(question.post(questionData)).resolves.not.toThrow();
  });

  it('should be able to list questions', async () => {
    const questions = await question.list();

    // console.log(questions);

    expect(questions).toBeDefined();
    expect(questions.length).toBeGreaterThan(0);
  });

  it('should be able to upvote a question', async () => {
    const questions = await question.list();

    const questionId = questions[0].id;

    await expect(question.upvote(questionId)).resolves.not.toThrow();
  });
});
