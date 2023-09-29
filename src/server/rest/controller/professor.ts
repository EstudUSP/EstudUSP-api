import { inject, injectable } from 'inversify';

import ProfessorUseCase from '../../../application/useCase/professor';

@injectable()
class ProfessorController {
  constructor(
    @inject(ProfessorUseCase) private readonly professor: ProfessorUseCase,
  ) {}

  list() {
    return this.professor.list();
  }
}

export default ProfessorController;
