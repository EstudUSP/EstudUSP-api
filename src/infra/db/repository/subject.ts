import { inject, injectable } from 'inversify';
import { DataSource, ILike, Repository } from 'typeorm';

import { Subject as SubjectSchema } from '../schema/subject';
import { Question as QuestionSchema } from '../schema/question';

@injectable()
class SubjectRepository {
  repository: Repository<SubjectSchema>;

  questionRepository: Repository<QuestionSchema>;

  constructor(
    @inject(DataSource) private readonly db: DataSource,
  ) {
    this.repository = this.db.getRepository(SubjectSchema);
    this.questionRepository = this.db.getRepository(QuestionSchema);
  }

  create(params: { id: string; title: string }) {
    const subject = new SubjectSchema();
    subject.id = params.id;
    subject.title = params.title;

    return this.repository.save(subject);
  }

  findById(id: string) {
    return this.repository.findOneBy({ id });
  }

  async list(keyword?: string) {
    const subjects = await this.repository.find({
      ...(keyword && { where: {
        title: ILike(`%${keyword}%`)
      } })
    });

    return subjects || [];
  }
}

export default SubjectRepository;
