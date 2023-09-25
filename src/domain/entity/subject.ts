export interface ISubject {
  id: string;
  title: string;
}

class Subject {
  id: string;

  title: string;

  constructor(id: string, title: string) {
    this.id = id;
    this.title = title;
  }
}

export default Subject;
