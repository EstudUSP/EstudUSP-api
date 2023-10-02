import { inject, injectable } from 'inversify';
import { DataSource, Repository } from 'typeorm';

import { User as UserSchema } from '../schema/user';
import { Reply as ReplySchema } from '../schema/reply';
import { Question as QuestionSchema } from '../schema/question';

import { ReplyDTO } from '../../../application/useCase/reply';
import User from '../../../domain/entity/user';

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

  async create(questionId: number, params: ReplyDTO, user: User) {
    const {
      anonymous,
      content,
      attachments,
    } = params;

    const question = await this.questionRepository.findOneBy({ id: questionId });

    if (!question) {
      throw new Error('Question not found');
    }

    const reply = new ReplySchema();

    reply.anonymous = anonymous;
    reply.upvotes = 0;
    reply.downvotes = 0;
    reply.content = content;
    reply.attachments = attachments;
    reply.user = this.userRepository.create(user);
    reply.question = question;

    return this.repository.save(reply);
  }

  async list(questionId: number) {
    return this.repository.find({
      where: {
        question: { id: questionId },
      },
      relations: ['user'],
    });
  }
}

export default ReplyRepository;
