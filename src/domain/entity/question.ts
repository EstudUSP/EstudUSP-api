import Professor from './professor';
import Subject from './subject';
import Tag from './tag';

export interface IQuestion {
  title: string;
  content: string;
  upvotes: number;
  anonymous: boolean;
  username: string;
  professor?: Professor;
  attachments: string[];
  tags: Tag[];
  subject: Subject;
}

export interface IQuestionList {
  id: number;
  title: string;
  content: string;
  upvotes: number;
  anonymous: boolean;
  user: { name: string, profilePicture: string };
  subject: string;
  attachments: string[];
  publishedAt: Date;
}

class Question {
  id: number;

  title: string;

  content: string;

  upvotes: number;

  anonymous: boolean;

  username: string;

  professor?: Professor;

  attachments: string[];

  tags: Tag[];

  subject: Subject;

  publishedAt: Date;

  constructor(id: number, params: IQuestion) {
    this.id = id;
    this.title = params.title;
    this.content = params.content;
    this.upvotes = params.upvotes;
    this.anonymous = params.anonymous;
    this.username = params.username;
    this.professor = params.professor;
    this.attachments = params.attachments;
    this.tags = params.tags;
    this.subject = params.subject;
    this.publishedAt = new Date();
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
      delete question.username;
    } else {
      // question.user = {
      //   name: question.user.name,
      //   profilePicture: question.user.profilePicture,
      // };
    }

    if (question.subject) {
      question.subject = question.subject.id + ' - ' + question.subject.title;
    }

    if (question.professor) {
      question.professor = question.professor.name;
    }

    question.repliesQuantity = question.replies.length;
    delete question.replies;

    return question;
  }
}

export default Question;
