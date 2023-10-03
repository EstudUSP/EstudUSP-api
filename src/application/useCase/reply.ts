import { inject, injectable } from 'inversify';
import QuestionRepository from '../../infra/db/repository/question';
import ReplyRepository from '../../infra/db/repository/reply';

import ReplyEntity from '../../domain/entity/reply';

export interface ReplyDTO {
  content: string;
  username: string;
  attachments: string[];
}

@injectable()
class Reply {
  constructor(
    @inject(ReplyRepository) private readonly replyRepository: ReplyRepository,
    @inject(QuestionRepository) private readonly questionRepository: QuestionRepository,
  ) {}

  async replyTo(questionId: number, reply: ReplyDTO) {
    const newReply = await this.replyRepository.create(questionId, reply);
    return ReplyEntity.format(newReply);
  }

  upvote(id: number) {
    // return this.replyRepository.upvote(id);
  }

  async list(id: number) {
    const repliesList = await this.replyRepository.list(id);
    return ReplyEntity.formatList(repliesList);
  }
}

export default Reply;
