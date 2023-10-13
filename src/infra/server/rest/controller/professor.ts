import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';

import ProfessorUseCase from '../../../../application/useCase/professor';

@injectable()
class ProfessorController {
  constructor(
    @inject(ProfessorUseCase) private readonly professor: ProfessorUseCase,
  ) {}

  async list(req: Request, res: Response) {
    const professors = await this.professor.list();
    return res.status(200).json(professors);
  }
}

export default ProfessorController;
