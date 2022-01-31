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

  async addPhoto(members: Array<number>) {
    const newPhoto = sequelize.model('Photo').create({
      members,
    });

    return newPhoto;
  }
}

export default new MediaService();
