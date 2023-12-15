import Professor from '../professor';
import { BuildContainer } from '../../../container';

describe('Professor use cases', () => {
  let professor: Professor;

  beforeAll(async () => {
    const container = await BuildContainer.getInstance();
    professor = container.get(Professor);
  });

  it('should be able to list professors', async () => {
    const professors = await professor.list();

    expect(professors).toBeDefined();
    expect(professors.length).toBeGreaterThan(0);
  });
});
