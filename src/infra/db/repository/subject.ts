import { inject, injectable } from 'inversify';
import { DataSource, Repository } from 'typeorm';

import { Subject as SubjectSchema } from '../schema/subject';
import Subject from '../../../domain/entity/subject';

@injectable()
class SubjectRepository {
  repository: Repository<SubjectSchema>;

  constructor(
    @inject(DataSource) private readonly db: DataSource,
  ) {
    this.repository = this.db.getRepository(SubjectSchema);
  }

  async create(params: { id: string; title: string }): Promise<Subject> {
    const subject = new SubjectSchema();
    subject.id = params.id;
    subject.title = params.title;

    const newSubject = await this.repository.save(subject);

    const subjectEntity = new Subject(newSubject);

    return subjectEntity;
  }

  async findById(id: string) {
    const subject = await this.repository.findOneBy({ id });

    if (!subject) return null;

    const subjectEntity = new Subject(subject);
    return subjectEntity;
  }

  async list() {
    const subjects = await this.repository.find();

    const subjectEntities = subjects.map((subject) => new Subject(subject));

    return subjectEntities;
  }
}

export default SubjectRepository;
