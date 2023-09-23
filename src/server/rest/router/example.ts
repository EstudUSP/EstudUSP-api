import { Router } from 'express';
import { inject, injectable } from 'inversify';
import ExampleController from '../controller/example';

@injectable()
export default class ExampleRouter {
  constructor(
        @inject(ExampleController) private readonly exampleController: ExampleController,
  ) {}

  async loadRouter() {
    const router = Router();
    router.post('/example', this.exampleController.create);

    return router;
  }
}
