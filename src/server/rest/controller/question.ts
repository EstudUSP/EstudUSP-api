import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import QuestionUseCase, { PostDTO } from '../../../application/useCase/question';

@injectable()
export default class AuthController {
  constructor(
    @inject(QuestionUseCase) private readonly question: QuestionUseCase,
  ) {}

  async post(req: Request, res: Response) {
    const { title, content, anonymous, professor, username, tags } = req.body;
    const subjectId = req.params.subjectId;

    console.log(req.files);

    const proxyHost = req.headers['x-forwarded-host'];
    const host = proxyHost ? proxyHost : req.headers.host;

    const attachments = !req.files ? [] : (req.files as []).map((file: Express.Multer.File) => (
      req.protocol + '://' + host + '/files/' + file?.filename.replaceAll(' ', '%20')
    ));

    const question: PostDTO = {
      title,
      content,
      anonymous: anonymous === 'true',
      upvotes: 0,
      username,
      professor,
      attachments,
      tags: !tags ? [] : tags.split(',').map((tag: string) => tag.trim()),
      subjectId,
    };

    try {
      const newQuestion = await this.question.post(question);
      res.status(201).json(newQuestion);
    } catch (err) {
      console.error(err);
      res.status(500).json(err.message);
    }
  }

  async list(req: Request, res: Response) {
    const subjectId = req.params.subjectId;
    const keyword = req.query.keyword as string;

    try {
      const subjects = await this.question.list(subjectId, keyword);
      res.status(200).json(subjects);
    } catch (err) {
      console.error(err);
      res.status(500).json(err.message);
    }
  }

  async listReplies(req: Request, res: Response) {
    const questionId = Number(req.params.questionId);

    try {
      const replies = await this.question.listReplies(questionId);
      return res.status(200).json(replies);
    } catch (err) {
      console.error(err);
      res.status(500).json(err.message);
    }
  }

  async upvote(req: Request, res: Response) {
    const questionId = Number(req.params.questionId);

    try {
      await this.question.upvote(questionId);
      res.status(200).json();
    } catch (err) {
      console.error(err);
      res.status(500).json(err.message);
    }
  }

  async downvote(req: Request, res: Response) {
    const questionId = Number(req.params.questionId);

    try {
      await this.question.downvote(questionId);
      res.status(200).json();
    } catch (err) {
      console.error(err);
      res.status(500).json(err.message);
    }
  }

  async sameQuestion(req: Request, res: Response) {
    const questionId = Number(req.params.questionId);

    try {
      const question = await this.question.sameQuestion(questionId);
      res.status(200).json(question);
    } catch (err) {
      console.error(err);
      res.status(500).json(err.message);
    }
  }

  async removeSameQuestion(req: Request, res: Response) {
    const questionId = Number(req.params.questionId);

    try {
      const question = await this.question.removeSameQuestion(questionId);
      res.status(200).json(question);
    } catch (err) {
      console.error(err);
      res.status(500).json(err.message);
    }
  }
}
