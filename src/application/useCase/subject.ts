import { inject, injectable } from 'inversify';

import SubjectRepository from '../../infra/db/repository/subject';

@injectable()
class Subject {
  constructor(
    @inject(SubjectRepository) private readonly subjectRepository: SubjectRepository,
  ) {}

  list() {
    return this.subjectRepository.list();
  }
}

export default Subject;
