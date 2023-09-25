export interface IProfessor {
  id: number;
  title: string;
}

class Professor {
  id: number;

  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

export default Professor;
