import { Router } from 'express';
import { inject, injectable } from 'inversify';
import multer from 'multer';

import QuestionController from '../controller/question';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.mode === 'production' ? '/mnt' : './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
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
    router.post(
      '/:subjectId/question',
      upload.array('attachments', 5),
      this.questionController.post.bind(this.questionController)
    );
    router.get(
      '/:subjectId/questions',
      this.questionController.list.bind(this.questionController)
    );
    router.get(
      '/question/:questionId/replies',
      this.questionController.listReplies.bind(this.questionController)
    );
    router.patch(
      '/question/:questionId/upvote',
      this.questionController.upvote.bind(this.questionController)
    );
    router.patch(
      '/question/:questionId/downvote',
      this.questionController.downvote.bind(this.questionController)
    );
    router.patch(
      '/question/:questionId/sameQuestion',
      this.questionController.sameQuestion.bind(this.questionController)
    );
    router.patch(
      '/question/:questionId/removeSameQuestion',
      this.questionController.removeSameQuestion.bind(this.questionController)
    );
    router.post(
      '/question/:questionId/reply',
      upload.array('attachments', 5),
      this.questionController.replyTo.bind(this.questionController)
    );

    router.patch(
      '/reply/:replyId/upvote',
      this.questionController.replyUpvote.bind(this.questionController)
    );

    router.patch(
      '/reply/:replyId/downvote',
      this.questionController.replyDonwvote.bind(this.questionController)
    );

    return router;
  }
}
