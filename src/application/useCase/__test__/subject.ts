import { DataSource } from 'typeorm';
import { Container } from 'inversify';

import Subject from '../subject';
import { BuildContainer } from '../../../container';

describe('Subject use cases', () => {
  let subject: Subject;
  let container: Container;

  beforeAll(async () => {
    container = await BuildContainer.getInstance();
    subject = container.get(Subject);
  });

  it('should be able to list subjects', async () => {
    const subjects = await subject.list();

    expect(subjects).toBeDefined();
    expect(subjects.length).toBeGreaterThan(0);
  });

  afterAll(async () => {
    const datasource = container.get(DataSource);
    await datasource.destroy();
  });
});
