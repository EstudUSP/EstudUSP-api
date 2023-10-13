import { inject, injectable } from 'inversify';
import { DataSource, ILike, Repository } from 'typeorm';

import { Question as QuestionSchema } from '../schema/question';
import { Tag as TagSchema } from '../schema/tag';
import { Professor as ProfessorSchema } from '../schema/professor';
import { User as UserSchema } from '../schema/user';
import { Subject as SubjectSchema } from '../schema/subject';

@injectable()
class QuestionRepository {
  repository: Repository<QuestionSchema>;

  userRepository: Repository<UserSchema>;

  professorRepository: Repository<ProfessorSchema>;

  tagRepository: Repository<TagSchema>;

  subjectRepository: Repository<SubjectSchema>;

  constructor(
    @inject(DataSource) private readonly db: DataSource,
  ) {
    this.repository = this.db.getRepository(QuestionSchema);
    this.userRepository = this.db.getRepository(UserSchema);
    this.professorRepository = this.db.getRepository(ProfessorSchema);
    this.tagRepository = this.db.getRepository(TagSchema);
    this.subjectRepository = this.db.getRepository(SubjectSchema);
  }

  async create(params: any) {
    const {
      title,
      anonymous,
      content,
      tags,
      professor,
      username,
      attachments,
      subject,
    } = params;

    const question = new QuestionSchema();

    question.title = title;
    question.anonymous = anonymous;
    question.upvotes = 0;
    question.content = content;
    question.username = username;
    question.sameQuestion = 0;

    if (professor) {
      question.professor = this.professorRepository.create(professor)[0];
    }
    // question.user = this.userRepository.create(user);
    question.tags = this.tagRepository.create(tags);
    question.attachments = attachments;
    question.subject = this.subjectRepository.create(subject)[0];

    const savedQuestion = await this.repository.save(question);

    return savedQuestion;
  }

  // @TODO: add tag filter
  list(subjectId: string, keyword?: string): Promise<QuestionSchema[]> {
    const defaultQuery = {
      subject: { id: subjectId },
    };

    return this.repository.find({
      relations: ['subject', 'replies'],
      where: [
        {
          ...defaultQuery,
          ...(keyword ? { title: ILike(`%${keyword}%`) } : {}),
        },
        {
          ...defaultQuery,
          ...(keyword ? { username: ILike(`%${keyword}%`) } : {}),
        },
      ],
      order: { publishedAt: 'DESC' },
    });
  }

  async getSubjectPreview(subjectId: string) {
    const questions = await this.repository.find({
      where: { subject: { id: subjectId } },
      relations: ['subject', 'professor'],
      order: { publishedAt: 'DESC' },
      take: 4,
    });

    return questions;
  }

  async upvote(id: number): Promise<void> {
    const question = await this.repository.findOneBy({ id });

    if (!question) {
      throw new Error('Question not found');
    }

    question.upvotes += 1;

    await this.repository.save(question);
  }

  async downvote(id: number): Promise<void> {
    const question = await this.repository.findOneBy({ id });

    if (!question) {
      throw new Error('Question not found');
    }

    question.upvotes -= 1;

    if (question.upvotes < 0) return;

    await this.repository.save(question);
  }

  async get(id: number) {
    const question = await this.repository.findOne({
      where: { id },
      relations: ['subject', 'professor']
    });

    if (!question) {
      throw new Error('Question not found');
    }

    return question;
  }

  async sameQuestion(id: number) {
    const question = await this.repository.findOneBy({ id });

    if (!question) {
      throw new Error('Question not found');
    }

    question.sameQuestion += 1;

    await this.repository.save(question);
  }

  async removeSameQuestion(id: number) {
    const question = await this.repository.findOneBy({ id });

    if (!question) {
      throw new Error('Question not found');
    }

    question.sameQuestion -= 1;

    if (question.sameQuestion < 0) return;

    await this.repository.save(question);
  }
}

export default QuestionRepository;
