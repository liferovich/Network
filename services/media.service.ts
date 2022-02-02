import { sequelize } from '../database/database.state';
import { Op } from 'sequelize';

class MediaService {
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

  async addPhoto(name: string, path: string) {
    sequelize.model('Photo').create({
      name,
      path,
    });

    return;
  }
}

export default new MediaService();
