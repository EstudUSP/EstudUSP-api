import 'reflect-metadata';
import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { Container } from 'inversify';

import Question from '../question';
import Reply from '../reply';
import SubjectSvc from '../subject';

import { Subject } from '../../../infra/db/schema/subject';

import { BuildContainer } from '../../../container';

describe('Reply use cases', () => {
  let question: Question;
  let reply: Reply;
  let subject: Subject;
  let container: Container;

  beforeAll(async () => {
    container = await BuildContainer.getInstance();
    question = container.get(Question);
    reply = container.get(Reply);

    const subjectSvc = container.get(SubjectSvc);
    subject = (await subjectSvc.list())[0];
  });

  it('should be able to add a reply to a question', async () => {
    const questions = await question.list(subject.id);
    const questionId = questions[0].id;

    const replyData = {
      username: faker.person.firstName(),
      content: faker.lorem.paragraph(),
      attachments: [faker.internet.url(), faker.internet.url()],
    };

    await expect(reply.replyTo(questionId, replyData)).resolves.not.toThrow();
  });

  afterAll(async () => {
    const datasource = container.get(DataSource);
    await datasource.destroy();
  });
});
