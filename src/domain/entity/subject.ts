export interface ISubject {
  id: string;
  title: string;
  previewImg: string;
  semester: number;
}

class Subject {
  id: string;

  title: string;

  previewImg: string;

  semester: number;

  constructor(params: ISubject) {
    this.id = params.id;
    this.title = params.title;
    this.previewImg = params.previewImg;
    this.semester = params.semester;
  }
}

export default Subject;
