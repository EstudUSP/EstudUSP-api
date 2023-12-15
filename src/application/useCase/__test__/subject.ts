import Subject from '../subject';
import { BuildContainer } from '../../../container';

describe('Subject use cases', () => {
  let subject: Subject;

  beforeAll(async () => {
    const container = await BuildContainer.getInstance();
    subject = container.get(Subject);
  });

  it('should be able to list subjects', async () => {
    const subjects = await subject.list();

    expect(subjects).toBeDefined();
    expect(subjects.length).toBeGreaterThan(0);
  });
});
