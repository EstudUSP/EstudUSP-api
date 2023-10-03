export default class Reply {
  static formatList(replies: any[]) {
    return replies.map((reply) => Reply.format(reply));
  }

  static format(reply: any) {
    reply.questionId = reply.question.id;
    delete reply.question;

    return reply;
  }
}
