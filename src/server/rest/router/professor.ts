import { Router } from 'express';
import { inject, injectable } from 'inversify';

import ProfessorController from '../controller/professor';

@injectable()
export default class ProfessorRouter {
  constructor(
    @inject(ProfessorController) private readonly professorController: ProfessorController,
  ) {}

  async loadRouter() {
    const router = Router();
    router.post('/professors', this.professorController.list.bind(this.professorController));

    return router;
  }
}
