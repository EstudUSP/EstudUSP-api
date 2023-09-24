import jwt from 'jsonwebtoken';

export interface IUser {
  name: string;
  email: string;
  password: string;
  picture_link?: string;
}

class User {
  public name: string;

  public email: string;

  public password: string;

  public picture_link?: string;

  private token?: string;

  constructor(user: IUser) {
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.picture_link = user.picture_link;
  }

  getToken(): string {
    if (!this.token) {
      this.token = jwt.sign({ email: this.email, password: this.password }, 'test');
    }

    return this.token;
  }
}

export default User;
