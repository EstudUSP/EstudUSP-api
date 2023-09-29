import { inject, injectable } from 'inversify';

import SubjectUseCase from '../../../application/useCase/subject';

@injectable()
class Subject {
  constructor(
    @inject(SubjectUseCase) private readonly subject: SubjectUseCase,
  ) {}

  list() {
    return this.subject.list();
  }
}

export default Subject;
