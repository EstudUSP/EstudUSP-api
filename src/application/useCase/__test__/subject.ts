import Subject from '../subject';
import buildContainer from '../../../container';

describe('Subject use cases', () => {
  let subject: Subject;

  beforeAll(async () => {
    const container = await buildContainer();
    subject = container.get(Subject);
  });

  it('should be able to list subjects', async () => {
    const subjects = await subject.list();

    console.log(subjects);

    expect(subjects).toBeDefined();
    expect(subjects.length).toBeGreaterThan(0);
  });
});
