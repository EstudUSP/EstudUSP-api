import { inject, injectable } from 'inversify';

import SubjectRepository from '../../infra/db/repository/subject';
import QuestionRepository from '../../infra/db/repository/question';

@injectable()
class Subject {
  constructor(
    @inject(SubjectRepository) private readonly subjectRepository: SubjectRepository,
    @inject(QuestionRepository) private readonly questionRepository: QuestionRepository,
  ) {}

  async list(keyword?: string) {
    const subjects = await this.subjectRepository.list(keyword);

    if (!subjects) return [];

    const complete = Promise.all(subjects.map(async (subject: any) => {
      subject.lastQuestions = await this.questionRepository.getSubjectPreview(subject.id);
      return subject;
    }));

    return complete;
  }
}

export default Subject;
