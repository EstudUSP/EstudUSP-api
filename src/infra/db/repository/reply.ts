import { inject, injectable } from 'inversify';
import { DataSource, Repository } from 'typeorm';

import { User as UserSchema } from '../schema/user';
import { Reply as ReplySchema } from '../schema/reply';

import { ReplyDTO } from '../../../application/useCase/reply';
import User from '../../../domain/entity/user';

@injectable()
class ReplyRepository {
  repository: Repository<ReplySchema>;

  userRepository: Repository<UserSchema>;

  constructor(
    @inject(DataSource) private readonly db: DataSource,
  ) {
    this.repository = this.db.getRepository(ReplySchema);
    this.userRepository = this.db.getRepository(UserSchema);
  }

  create(params: ReplyDTO, user: User) {
    const {
      anonymous,
      content,
      attachments,
    } = params;

    const reply = new ReplySchema();

    reply.anonymous = anonymous;
    reply.likes = 0;
    reply.dislikes = 0;
    reply.content = content;
    reply.attachments = attachments;
    reply.user = this.userRepository.create(user);

    return this.repository.save(reply);
  }
}

export default ReplyRepository;
