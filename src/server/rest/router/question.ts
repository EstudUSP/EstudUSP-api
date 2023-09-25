import { Router } from 'express';
import { inject, injectable } from 'inversify';

import QuestionController from '../controller/question';

@injectable()
export default class AuthRouter {
  constructor(
    @inject(QuestionController) private readonly questionController: QuestionController,
  ) {}

  async loadRouter() {
    const router = Router();
    router.post('/post', this.questionController.post.bind(this.questionController));

    return router;
  }
}
