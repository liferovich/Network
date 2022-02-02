import { sequelize } from '../database/database.state';
import { Op } from 'sequelize';

type ProfileType = {
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
};

class ProfileService {
  async getProfile(id: string) {
    const profile = await sequelize.model('Profile').findOne({
      where: {
        UserId: id,
      },
    });

    if (!profile) {
      throw { status: 500, message: 'Crashed creating profile' };
    }

    return profile;
  }

  async getProfiles(friendsIds: Array<number>) {
    const profiles = await sequelize.model('Profile').findAll({
      where: {
        UserId: { [Op.notIn]: friendsIds },
      },
    });

    if (!profiles) {
      throw { status: 500, message: 'Crashed creating profile' };
    }

    return profiles;
  }

  async getProfilesByIds(ids: Array<number>) {
    const profiles = await sequelize.model('Profile').findAll({
      where: {
        UserId: ids,
      },
    });

    if (!profiles) {
      throw { status: 500, message: 'Crashed creating profile' };
    }

    return profiles;
  }

  async editProfile(id: string, profile: ProfileType) {
    const updatedProfile = await sequelize.model('Profile').update(profile, {
      where: {
        id,
      },
      returning: true,
    });

    if (!updatedProfile) {
      throw { status: 500, message: 'Crashed editing profile' };
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
      throw { status: 500, message: 'Crashed deleting user' };
    }

    return user;
  }
}

export default new ProfileService();
