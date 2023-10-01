import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import QuestionUseCase, { PostDTO } from '../../../application/useCase/question';

@injectable()
export default class AuthController {
  constructor(
    @inject(QuestionUseCase) private readonly question: QuestionUseCase,
  ) {}

  async post(req: Request, res: Response) {
    const { title, content, anonymous, professor, subjectId, username, tags } = req.body;
    // const userToken = req.headers.authorization;

    console.log(req.files);

    const proxyHost = req.headers['x-forwarded-host'];
    const host = proxyHost ? proxyHost : req.headers.host;

    const attachments = !req.files ? [] : (req.files as []).map((file: Express.Multer.File) => (
      req.protocol + '://' + host + '/files/' + file?.filename.replaceAll(' ', '%20')
    ));

    const question: PostDTO = {
      title,
      content,
      anonymous,
      upvote: 0,
      username,
      professor,
      attachments,
      tags: !tags ? [] : tags.split(',').map((tag: string) => tag.trim()),
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
