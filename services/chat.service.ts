import { sequelize } from '../database/database.state';
import { Op } from 'sequelize';

class ChatService {
  async getChats(id: number) {
    let chats = await sequelize.model('Chat').findAll({
      where: {
        members: { [Op.contains]: [id] },
      },
    });

    if (!chats) {
      chats = [];
    }

    return chats;
  }

  async addChat(members: Array<number>) {
    const newChat = sequelize.model('Chat').create({
      members,
    });

    return newChat;
  }
}

export default new ChatService();
