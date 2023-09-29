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

export interface IQuestionList {
  id: number;
  title: string;
  content: string;
  upvote: number;
  anonymous: boolean;
  user: { name: string, profilePicture: string };
  subject: string;
  attachments: string[];
}

class Question {
  id: number;

  title: string;

  content: string;

  upvote: number;

  anonymous: boolean;

  user: IUser;

  professor: Professor;

  attachments: string[];

  tags: Tag[];

  subject: Subject;

  constructor(id: number, params: IQuestion) {
    this.id = id;
    this.title = params.title;
    this.content = params.content;
    this.upvote = params.upvote;
    this.anonymous = params.anonymous;
    this.user = params.user;
    this.professor = params.professor;
    this.attachments = params.attachments;
    this.tags = params.tags;
    this.subject = params.subject;
  }

  // @TODO: move to DTO
  static formatList(questions: Question[]): IQuestionList[] {
    const formattedQuestions = questions.map((question: any) => (
      this.format(question)
    ));

    return formattedQuestions;
  }

  static format(question: any): IQuestionList {
    Object.keys(question).forEach((key: string) => {
      if (question[key] === undefined) {
        delete question[key];
      }
    });

    if (question.anonymous) {
      delete question.user;
    } else {
      question.user = {
        name: question.user.name,
        profilePicture: question.user.profilePicture,
      };
    }

    if (question.subject) {
      question.subject = question.subject.id + ' - ' + question.subject.title;
    }

    if (question.professor) {
      question.professor = question.professor.name;
    }

    // if (!question.replies) {
    //   question
    // }

    return question;
  }
}

export default Question;
