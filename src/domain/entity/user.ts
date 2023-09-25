import jwt from 'jsonwebtoken';

export interface IUser {
  name: string;
  email: string;
  password: string;
  profilePicture?: string;
}

class User {
  id: number;

  public name: string;

  public email: string;

  public password: string;

  public profilePicture?: string;

  private _token?: string;

  get token() {
    if (!this._token) {
      this._token = jwt.sign({ email: this.email, password: this.password }, 'test');
    }

    return this._token;
  }

  constructor(id: number, user: IUser) {
    this.id = id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.profilePicture = user.profilePicture;
  }
}

export default User;
