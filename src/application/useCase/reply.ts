import { inject, injectable } from 'inversify';
import SessionService from '../../domain/service/session';
import QuestionRepository from '../../infra/db/repository/question';
import ReplyRepository from '../../infra/db/repository/reply';

import QuestionEntity from '../../domain/entity/question';

export interface ReplyDTO {
  content: string;
  anonymous: boolean;
  userToken: string;
  attachments: string[];
}

@injectable()
class Question {
  constructor(
    @inject(SessionService) private readonly sessions: SessionService,
    @inject(ReplyRepository) private readonly replyRepository: ReplyRepository,
    @inject(QuestionRepository) private readonly questionRepository: QuestionRepository,
  ) {}

  async replyTo(questionId: number, reply: ReplyDTO) {
    // @TODO: move to auth middleware
    const userSession = this.sessions.get(reply.userToken);

    if (!userSession) {
      throw new Error('Session invalid');
    }

    const newReply = await this.replyRepository.create(reply, userSession);

    if (!newReply) {
      throw new Error('Cannot create reply');
    }

    await this.questionRepository.addReply(questionId, newReply);
  }

  async list(keyword?: string) {
    const questions = await this.questionRepository.list(keyword);
    return QuestionEntity.formatList(questions);
  }

  // @TODO: handle downvote
  upvote(id: number) {
    return this.questionRepository.upvote(id);
  }

  async get(id: number) {
    const question = await this.questionRepository.get(id);
    return QuestionEntity.format(question);
  }
}

export default Question;
