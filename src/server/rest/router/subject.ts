import { Router } from 'express';
import { inject, injectable } from 'inversify';

import SubjectController from '../controller/subject';

@injectable()
export default class SubjectRouter {
  constructor(
    @inject(SubjectController) private readonly subjectController: SubjectController,
  ) {}

  async loadRouter() {
    const router = Router();
    router.post('/subjects', this.subjectController.list.bind(this.subjectController));

    return router;
  }
}
