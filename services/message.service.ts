import { sequelize } from '../database/database.state';

class MessageService {
  async getMessages(ChatId: number) {
    let messages = await sequelize.model('Message').findAll({
      where: {
        ChatId,
      },
    });

    if (!messages) {
      messages = [];
    }

    return messages;
  }

  async addMessage(sender: number, ChatId: number, text: string) {
    const newMessage = sequelize.model('Message').create({
      sender,
      text,
      ChatId,
    });

    return newMessage;
  }
}

export default new MessageService();
