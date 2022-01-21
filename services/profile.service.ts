import { sequelize } from '../database/database.state';

class ProfileService {
  async getProfile(id: string) {
    let profile = await sequelize.model('Profile').findOne({
      where: {
        UserId: id,
      },
    });

    if (!profile) {
      throw new Error('Crashed creating profile');
    }

    return profile;
  }

  async editProfile(
    id: string,
    profile: {
      id: number;
      firstname: string;
      lastname: string;
      age: number;
      avatar: string;
      email: string;
      phone: string;
      sex: string;
      status: string;
      instagram: string;
      UserId: number;
    }
  ) {
    const updatedProfile = await sequelize.model('Profile').update(profile, {
      where: {
        id,
      },
      returning: true,
    });

    if (!updatedProfile) {
      console.log('Crashed editing profile');
      throw new Error('Crashed editing profile');
    }

    const data = updatedProfile[1][0].get();

    return data;
  }

  async deleteUser(id: number) {
    await sequelize.model('Token').destroy({
      where: {
        id,
      },
    });

    await sequelize.model('Profile').destroy({
      where: {
        id,
      },
    });

    let user = await sequelize.model('User').destroy({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error('Crashed deleting user');
    }

    return user;
  }
}

export default new ProfileService();
