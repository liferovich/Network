import express from 'express';
import messageService from '../services/message.service';

class MessageController {
  async getMessages(req: express.Request, res: express.Response) {
    try {
      const id = req.params.id;
      const messages = await messageService.getMessages(Number(id));

      return res.json(messages);
    } catch (err: any) {
      if (err.status) {
        res.status(err.status).json({ error: { message: err.message } });
      } else {
        res.status(500).json({ error: { message: 'Server error..' } });
      }
    }
  }

  async addMessage(req: express.Request, res: express.Response) {
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
    } catch (err: any) {
      if (err.status) {
        res.status(err.status).json({ error: { message: err.message } });
      } else {
        res.status(500).json({ error: { message: 'Server error..' } });
      }
    }
  }
}

export default new MessageController();
