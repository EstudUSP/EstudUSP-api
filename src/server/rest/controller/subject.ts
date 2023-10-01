import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';

import SubjectUseCase from '../../../application/useCase/subject';

@injectable()
class Subject {
  constructor(
    @inject(SubjectUseCase) private readonly subject: SubjectUseCase,
  ) {}

  async list(req: Request, res: Response) {
    const subjects = await this.subject.list();
    return res.status(200).json(subjects);
  }
}

export default Subject;
