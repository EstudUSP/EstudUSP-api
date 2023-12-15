import { DataSource } from 'typeorm';
import { Container } from 'inversify';

import Professor from '../professor';
import { BuildContainer } from '../../../container';

describe('Professor use cases', () => {
  let professor: Professor;
  let container: Container;

  beforeAll(async () => {
    container = await BuildContainer.getInstance();
    professor = container.get(Professor);
  });

  it('should be able to list professors', async () => {
    const professors = await professor.list();

    expect(professors).toBeDefined();
    expect(professors.length).toBeGreaterThan(0);
  });

  afterAll(async () => {
    const datasource = container.get(DataSource);
    await datasource.destroy();
  });
});
