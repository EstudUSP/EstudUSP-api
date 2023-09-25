import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import AuthUseCase from '../../../application/useCase/auth';

@injectable()
export default class AuthController {
  constructor(
    @inject(AuthUseCase) private readonly auth: AuthUseCase,
  ) {}

  async signUp(req: Request, res: Response) {
    const { email, password, name } = req.body;

    const proxyHost = req.headers['x-forwarded-host'];
    const host = proxyHost ? proxyHost : req.headers.host;

    const profilePicture = req.protocol + '://' + host + '/files/' + req.file?.filename;

    const user = {
      email,
      password,
      name,
      profilePicture,
    };

    try {
      await this.auth.signUp(user);
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err.message);
    }
  }

  async signIn(request: Request, response: Response) {
    const { email, password } = request.body;

    try {
      const user = await this.auth.signIn(email, password);
      response.status(200).json(user);
    } catch (err) {
      response.status(500).json(err.message);
    }
  }
}
