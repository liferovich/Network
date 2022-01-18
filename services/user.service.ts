import { sequelize } from '../database/database.state';

class UserService {
  async getAllUsers() {
    const users = await sequelize.model('User').findAll({});

    return users;
  }
}

export default new UserService();
