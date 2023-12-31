import { inject, injectable } from 'inversify';
import SessionService from '../../domain/service/session';
import QuestionEntity from '../../domain/entity/question';

import TagRepository from '../../infra/db/repository/tag';
import ProfessorRepository from '../../infra/db/repository/professor';
import QuestionRepository from '../../infra/db/repository/question';
import SubjectRepository from '../../infra/db/repository/subject';
import UserRepository from '../../infra/db/repository/user';
import ReplyRepository from '../../infra/db/repository/reply';

export interface PostDTO {
  title: string;
  content: string;
  upvotes: number;
  anonymous: boolean;
  username: string;
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
    @inject(UserRepository) private readonly userRepository: UserRepository,
    @inject(ReplyRepository) private readonly replyRepository: ReplyRepository,
  ) {}

  async post(post: PostDTO) {
    const subject = await this.subjectRepository.findById(post.subjectId);

    if (!subject) {
      throw new Error('Subject not found');
    }

    // @TODO: implements transactions
    const tags = await this.tagRepository.create(post.tags, subject);

    let professor;

    if (post.professor) {
      professor = await this.professorRepository.get(post.professor);

      if (!professor) {
        professor = await this.professorRepository.create(post.professor);
      }
    }

    const question = await this.questionRepository.create({
      ...post,
      tags,
      subject,
      professor,
    });

    return QuestionEntity.format(question);
  }

  async list(subjectId: string, keyword?: string, professor?: string) {
    const questions = await this.questionRepository.list(subjectId, keyword, professor);
    return QuestionEntity.formatList(questions);
  }

  async getSubjectPreview(subjectId: string) {
    const questions = await this.questionRepository.getSubjectPreview(subjectId);
    return QuestionEntity.formatList(questions);
  }

  upvote(id: number) {
    return this.questionRepository.upvote(id);
  }

  downvote(id: number) {
    return this.questionRepository.downvote(id);
  }

  async get(id: number) {
    const question = await this.questionRepository.get(id);
    return QuestionEntity.format(question);
  }

  async sameQuestion(id: number) {
    return this.questionRepository.sameQuestion(id);
  }

  async removeSameQuestion(id: number) {
    return this.questionRepository.removeSameQuestion(id);
  }
}

export default Question;
