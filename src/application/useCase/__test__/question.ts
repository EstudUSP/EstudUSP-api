import 'reflect-metadata';
import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { Container } from 'inversify';

import Question from '../question';
import SubjectSvc from '../subject';

import { Subject } from '../../../infra/db/schema/subject';

import { BuildContainer } from '../../../container';

describe('Question use cases', () => {
  let question: Question;
  let subject: Subject;
  let container: Container;

  beforeAll(async () => {
    container = await BuildContainer.getInstance();
    question = container.get(Question);

    const subjectSvc = container.get(SubjectSvc);
    subject = (await subjectSvc.list())[0];
  });

  it('should be able to post a question', async () => {
    const questionData = {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      upvotes: 0,
      anonymous: false,
      username: faker.person.firstName(),
      professor: faker.person.fullName(),
      attachments: [faker.internet.url(), faker.internet.url()],
      tags: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
      subjectId: subject.id,
    };

    await expect(question.post(questionData)).resolves.not.toThrow();
  });

  it('should be able to list questions', async () => {
    const questions = await question.list(subject.id);

    expect(questions).toBeDefined();
    expect(questions.length).toBeGreaterThan(0);
  });

  it('should be able to upvote a question', async () => {
    const questions = await question.list(subject.id);
    const questionId = questions[0].id;

    await expect(question.upvote(questionId)).resolves.not.toThrow();
  });

  it('should be able to get a question by id', async () => {
    const questions = await question.list(subject.id);
    const questionId = questions[0].id;

    const questionData = await question.get(questionId);

    expect(questionData).toBeDefined();
    expect(questionData.id).toBe(questionId);
  });

  afterAll(async () => {
    const datasource = container.get(DataSource);
    await datasource.destroy();
  });
});
