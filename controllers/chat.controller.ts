import express from 'express';
import chatService from '../services/chat.service';
import profileService from '../services/profile.service';

// type ChatType = {
//   id: number;
//   createdAt: Date;
//   updated: Date;
//   members: number[];
// };

class ChatController {
  async getChats(req: express.Request, res: express.Response) {
    try {
      const id = req.params.id;
      const chats = await chatService.getChats(Number(id));

      let members: number[] = [];
      chats.forEach((chat: any) =>
        chat.members.forEach((member: number) => {
          if (!members.includes(member) && member !== Number(id)) {
            members.push(member);
          }
        })
      );

      const profiles = await profileService.getProfilesByIds(members);

      return res.json({ chats, profiles });
    } catch (err: any) {
      if (err.status) {
        res.status(err.status).json({ error: { message: err.message } });
      } else {
        res.status(500).json({ error: { message: 'Server error..' } });
      }
    }
  }

  async addChat(req: express.Request, res: express.Response) {
    try {
      const members = [req.body.senderId, req.body.receiverId];
      const newChat = await chatService.addChat(members);

      return res.json(newChat);
    } catch (err: any) {
      if (err.status) {
        res.status(err.status).json({ error: { message: err.message } });
      } else {
        res.status(500).json({ error: { message: 'Server error..' } });
      }
    }
  }
}

export default new ChatController();
