import Question from './question';

export interface ISubject {
  id: string;
  title: string;
  previewImg: string;
  semester: number;
  lastQuestion?: Question;
}

class Subject {
  id: string;

  title: string;

  previewImg: string;

  semester: number;

  lastQuestion?: Question;

  constructor(params: ISubject) {
    this.id = params.id;
    this.title = params.title;
    this.previewImg = params.previewImg;
    this.semester = params.semester;
    this.lastQuestion = params.lastQuestion;
  }
}

export default Subject;
