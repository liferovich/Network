import express from 'express';
import chatService from '../services/chat.service';
import profileService from '../services/profile.service';

class ChatController {
  async getChats(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const id = req.params.id;
      const chats = await chatService.getChats(Number(id));

      let members: number[] = [];
      chats.forEach((chat) =>
        JSON.parse(JSON.stringify(chat)).members.forEach((member: number) => {
          if (!members.includes(member) && member !== Number(id)) {
            members.push(member);
          }
        })
      );

      const profiles = await profileService.getProfilesByIds(members);

      return res.json({ chats, profiles });
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
