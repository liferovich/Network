import express from 'express';
import chatService from '../services/chat.service';

class ChatController {
  async getChats(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const id = req.params.id;
      const chats = await chatService.getChats(Number(id));

      return res.json(chats);
    } catch (e) {
      next(e);
    }
  }

  async addChat(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const members = [req.body.senderId, req.body.receiverId];
      const newChat = await chatService.addChat(members);

      return res.json(newChat);
    } catch (e) {
      next(e);
    }
  }
}

export default new ChatController();
