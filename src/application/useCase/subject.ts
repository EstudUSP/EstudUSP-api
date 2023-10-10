import { inject, injectable } from 'inversify';

import SubjectRepository from '../../infra/db/repository/subject';
import QuestionRepository from '../../infra/db/repository/question';

import SubjectEntity from '../../domain/entity/subject';

@injectable()
class Subject {
  constructor(
    @inject(SubjectRepository) private readonly subjectRepository: SubjectRepository,
    @inject(QuestionRepository) private readonly questionRepository: QuestionRepository,
  ) {}

  async list(keyword?: string) {
    const subjects: SubjectEntity[] = await this.subjectRepository.list(keyword);

    if (!subjects) return [];

    const complete = Promise.all(subjects.map(async (subject: any) => {
      subject.lastQuestions = await this.questionRepository.getSubjectPreview(subject.id);
      return subject;
    }));

    return complete;
  }
}

export default Subject;
