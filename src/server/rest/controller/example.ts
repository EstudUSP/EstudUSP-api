import { Request, Response } from 'express';
import { injectable } from 'inversify';

@injectable()
export default class ExampleController {
  create(request: Request, response: Response) {
    response.status(201).json({ message: 'created!' });
  }
}
