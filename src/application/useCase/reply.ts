import { inject, injectable } from 'inversify';
import SessionService from '../../domain/service/session';
import QuestionRepository from '../../infra/db/repository/question';
import ReplyRepository from '../../infra/db/repository/reply';

export interface ReplyDTO {
  content: string;
  anonymous: boolean;
  userToken: string;
  attachments: string[];
}

@injectable()
class Reply {
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

    await this.replyRepository.create(questionId, reply, userSession);
  }

  upvote(id: number) {
    return this.questionRepository.upvote(id);
  }
}

export default Reply;
