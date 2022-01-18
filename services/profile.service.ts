import { sequelize } from '../database/database.state';

class ProfileService {
  async getProfile(id: string) {
    let profile = await sequelize.model('Profile').findOne({
      where: {
        user_id: id,
      },
    });

    if (!profile) {
      profile = (
        await sequelize.model('Profile').create({
          user_id: id,
          UserId: id,
          firstname: '',
          lastname: '',
          age: 0,
        })
      ).get({ plain: true });

      if (!profile) {
        throw new Error('Crashed creating profile');
      }
    }

    return profile;
  }
}

export default new ProfileService();
