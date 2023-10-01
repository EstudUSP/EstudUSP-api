import { inject, injectable } from 'inversify';
import { DataSource, Repository } from 'typeorm';

import { Subject as SubjectSchema } from '../schema/subject';
import { Question as QuestionSchema } from '../schema/question';
import Subject from '../../../domain/entity/subject';
import Question from '../../../domain/entity/question';

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
    const subjects = await this.repository.find({ relations: ['lastQuestion'] });

    const subjectEntities = subjects.map((subject) => new Subject(subject));

    return subjectEntities;
  }

  async updateLastQuestion(id: string, question: Question) {
    const subject = await this.repository.findOneBy({ id });

    if (!subject) return null;

    subject.lastQuestion = this.questionRepository.create(question);
    await this.repository.save(subject);
  }
}

export default SubjectRepository;
