import { Reply as ReplySchema } from '../../infra/db/schema/reply';

export default class Reply {
  // @TODO: move to DTO?
  static formatList(replies: ReplySchema[]) {
    return replies.map((reply) => Reply.format(reply));
  }

  static format(reply: any) {
    reply.questionId = reply.question.id;
    delete reply.question;

    return reply;
  }
}
