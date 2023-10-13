import { Question as QuestionSchema } from '../../infra/db/schema/question';

class Question {
  // @TODO: move to DTO
  static formatList(questions: QuestionSchema[]): QuestionSchema[] {
    const formattedQuestions = questions.map((question: any) => (
      this.format(question)
    ));

    return formattedQuestions;
  }

  static format(question: any): QuestionSchema {
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

    question.repliesQuantity = question.replies?.length || 0;
    delete question.replies;

    return question;
  }
}

export default Question;
