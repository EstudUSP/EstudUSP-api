import { inject, injectable } from 'inversify';

import ProfessorRepository from '../../infra/db/repository/professor';

@injectable()
class Professor {
  constructor(
    @inject(ProfessorRepository) private readonly professorRepository: ProfessorRepository,
  ) {}

  list() {
    return this.professorRepository.list();
  }
}

export default Professor;
