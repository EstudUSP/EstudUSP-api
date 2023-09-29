import Professor from '../professor';
import buildContainer from '../../../container';

describe('Professor use cases', () => {
  let professor: Professor;

  beforeAll(async () => {
    const container = await buildContainer();
    professor = container.get(Professor);
  });

  it('should be able to list professors', async () => {
    const professors = await professor.list();

    console.log(professors);

    expect(professors).toBeDefined();
    expect(professors.length).toBeGreaterThan(0);
  });
});
