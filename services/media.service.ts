import { sequelize } from '../database/database.state';

class MediaService {
  async getMedia(id: string) {
    let photos = await sequelize.model('Photo').findAll({
      where: {
        UserId: id,
      },
      order: [['createdAt', 'DESC']],
    });

    if (!photos) {
      photos = [];
    }

    return photos;
  }

  async addPhoto(name: string, path: string, id: string) {
    const photo = sequelize.model('Photo').create({
      name,
      path,
      UserId: id,
    });

    return photo;
  }
}

export default new MediaService();
