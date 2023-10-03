import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import QuestionUseCase, { PostDTO } from '../../../application/useCase/question';
import ReplyUseCase from '../../../application/useCase/reply';

@injectable()
export default class QuestionController {
  constructor(
    @inject(QuestionUseCase) private readonly question: QuestionUseCase,
    @inject(ReplyUseCase) private readonly reply: ReplyUseCase,
  ) {}

  async post(req: Request, res: Response) {
    const { title, content, anonymous, professor, username, tags } = req.body;
    const subjectId = req.params.subjectId;

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
      const replies = await this.reply.list(questionId);
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

  async replyTo(req: Request, res: Response) {
    const questionId = Number(req.params.questionId);
    const { content, username } = req.body;

    const proxyHost = req.headers['x-forwarded-host'];
    const host = proxyHost ? proxyHost : req.headers.host;

    const attachments = !req.files ? [] : (req.files as []).map((file: Express.Multer.File) => (
      req.protocol + '://' + host + '/files/' + file?.filename.replaceAll(' ', '%20')
    ));

    const reply = {
      content,
      username,
      attachments,
    };

    try {
      const newReply = await this.reply.replyTo(questionId, reply);
      res.status(201).json(newReply);
    } catch (err) {
      console.error(err);
      res.status(500).json(err.message);
    }
  }

  async replyUpvote(req: Request, res: Response) {
    const replyId = Number(req.params.replyId);

    try {
      await this.reply.upvote(replyId);
      res.status(200).json();
    } catch (err) {
      console.error(err);
      res.status(500).json(err.message);
    }
  }

  async replyDonwvote(req: Request, res: Response) {
    const replyId = Number(req.params.replyId);

    try {
      await this.reply.downvote(replyId);
      res.status(200).json();
    } catch (err) {
      console.error(err);
      res.status(500).json(err.message);
    }
  }
}
