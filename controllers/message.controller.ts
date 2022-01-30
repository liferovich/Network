import express from 'express';
import messageService from '../services/message.service';

class MessageController {
  async getMessages(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const id = req.params.id;
      const messages = await messageService.getMessages(Number(id));

      return res.json(messages);
    } catch (e) {
      next(e);
    }
  }

  async addMessage(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const sender = req.body.sender;
      const ChatId = req.body.ChatId;
      const text = req.body.text;
      const message = await messageService.addMessage(
        Number(sender),
        Number(ChatId),
        text
      );

      return res.json(message);
    } catch (e) {
      next(e);
    }
  }
}

export default new MessageController();
