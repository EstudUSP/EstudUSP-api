import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import QuestionUseCase, { PostDTO } from '../../../application/useCase/question';

@injectable()
export default class AuthController {
  constructor(
    @inject(QuestionUseCase) private readonly question: QuestionUseCase,
  ) {}

  async post(req: Request, res: Response) {
    const { title, content, anonymous, professor, subjectId } = req.body;
    const userToken = req.headers.authorization;

    // const proxyHost = req.headers['x-forwarded-host'];
    // const host = proxyHost ? proxyHost : req.headers.host;

    // const profilePicture = req.protocol + '://' + host + '/files/' + req.file?.filename;

    const question: PostDTO = {
      title,
      content,
      anonymous,
      upvote: 0,
      userToken: userToken as string,
      professor,
      attachments: [],
      tags: [],
      subjectId,
    };

    try {
      await this.question.post(question);
      res.status(201).json(question);
    } catch (err) {
      console.error(err);
      res.status(500).json(err.message);
    }
  }
}
