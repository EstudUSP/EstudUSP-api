import { inject, injectable } from 'inversify';
import { DataSource, Repository } from 'typeorm';

import { User as UserSchema } from '../schema/user';
import { Reply as ReplySchema } from '../schema/reply';
import { Question as QuestionSchema } from '../schema/question';

import { ReplyDTO } from '../../../application/useCase/reply';

@injectable()
class ReplyRepository {
  repository: Repository<ReplySchema>;

  userRepository: Repository<UserSchema>;

  questionRepository: Repository<QuestionSchema>;

  constructor(
    @inject(DataSource) private readonly db: DataSource,
  ) {
    this.repository = this.db.getRepository(ReplySchema);
    this.userRepository = this.db.getRepository(UserSchema);
    this.questionRepository = this.db.getRepository(QuestionSchema);
  }

  async create(questionId: number, params: ReplyDTO) {
    const {
      content,
      attachments,
      username,
    } = params;

    const question = await this.questionRepository.findOneBy({ id: questionId });

    if (!question) {
      throw new Error('Question not found');
    }

    const reply = new ReplySchema();

    reply.upvotes = 0;
    reply.content = content;
    reply.attachments = attachments;
    reply.username = username;
    reply.question = question;

    return this.repository.save(reply);
  }

  async list(questionId: number) {
    return this.repository.find({
      where: {
        question: { id: questionId },
      },
      relations: ['question'],
      order: { upvotes: 'DESC', publishedAt: 'DESC' },
    });
  }

  async upvote(id: number) {
    const reply = await this.repository.findOneBy({ id });

    if (!reply) {
      throw new Error('Reply not found');
    }

    reply.upvotes += 1;

    return this.repository.save(reply);
  }

  async downvote(id: number) {
    const reply = await this.repository.findOneBy({ id });

    if (!reply) {
      throw new Error('Reply not found');
    }

    reply.upvotes -= 1;

    return this.repository.save(reply);
  }
}

export default ReplyRepository;
