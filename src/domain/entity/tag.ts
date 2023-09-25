export interface ITag {
  id: number;
  title: string;
}

class Tag {
  id: number;

  title: string;

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
  }
}

export default Tag;
