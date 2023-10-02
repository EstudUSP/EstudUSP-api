import { Router } from 'express';
import { inject, injectable } from 'inversify';
import multer from 'multer';

import QuestionController from '../controller/question';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

@injectable()
export default class QuestionRouter {
  constructor(
    @inject(QuestionController) private readonly questionController: QuestionController,
  ) {}

  async loadRouter() {
    const router = Router();
    router.post('/:subjectId/question',
      upload.array('attachments', 5), this.questionController.post.bind(this.questionController)
    );
    router.get('/:subjectId/questions', this.questionController.list.bind(this.questionController));
    router.get('/question/:questionId/replies', this.questionController.listReplies.bind(this.questionController));

    return router;
  }
}
