import { Router } from 'express';
import { inject, injectable } from 'inversify';
import multer from 'multer';

import AuthController from '../controller/auth';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.MODE === 'production' ? '/mnt/uploads' : './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

@injectable()
export default class AuthRouter {
  constructor(
    @inject(AuthController) private readonly authController: AuthController,
  ) {}

  async loadRouter() {
    const router = Router();
    router.post('/signUp', upload.single('profilePicture'), this.authController.signUp.bind(this.authController));
    router.post('/signIn', this.authController.signIn.bind(this.authController));

    return router;
  }
}
