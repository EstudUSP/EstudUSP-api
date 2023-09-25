import Professor from './professor';
import Subject from './subject';
import Tag from './tag';
import { IUser } from './user';

export interface IQuestion {
  title: string;
  content: string;
  upvote: number;
  anonymous: boolean;
  user: IUser;
  professor: Professor;
  attachments: string[];
  tags: Tag[];
  subject: Subject;
}

class Question {
  title: string;

  content: string;

  upvote: number;

  anonymous: boolean;

  user: IUser;

  professor: Professor;

  attachments: string[];

  tags: Tag[];

  constructor(params: IQuestion) {
    this.title = params.title;
    this.content = params.content;
    this.upvote = params.upvote;
    this.anonymous = params.anonymous;
    this.user = params.user;
    this.professor = params.professor;
    this.attachments = params.attachments;
    this.tags = params.tags;
  }
}

export default Question;
