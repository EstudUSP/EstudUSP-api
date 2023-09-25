import { inject, injectable } from 'inversify';
import SessionService from '../../domain/service/session';
import TagRepository from '../../infra/db/repository/tag';
import ProfessorRepository from '../../infra/db/repository/professor';
import QuestionRepository from '../../infra/db/repository/question';
import SubjectRepository from '../../infra/db/repository/subject';

export interface PostDTO {
  title: string;
  content: string;
  upvote: number;
  anonymous: boolean;
  userToken: string;
  professor: string;
  attachments: string[];
  tags: string[];
  subjectId: string;
}

@injectable()
class Question {
  constructor(
    @inject(SessionService) private readonly sessions: SessionService,
    @inject(TagRepository) private readonly tagRepository: TagRepository,
    @inject(ProfessorRepository) private readonly professorRepository: ProfessorRepository,
    @inject(QuestionRepository) private readonly questionRepository: QuestionRepository,
    @inject(SubjectRepository) private readonly subjectRepository: SubjectRepository,
  ) {}

  async post(post: PostDTO) {
    // @TODO: move to auth middleware
    const userSession = this.sessions.get(post.userToken);

    if (!userSession) {
      throw new Error('Session invalid');
    }

    const subject = await this.subjectRepository.findById(post.subjectId);

    if (!subject) {
      throw new Error('Subject not found');
    }

    // @TODO: implements transactions
    const tags = await this.tagRepository.create(post.tags, subject);
    const professor = await this.professorRepository.create(post.professor);

    await this.questionRepository.create({
      ...post,
      user: userSession,
      professor,
      tags,
      subject,
    });
  }
}

export default Question;
