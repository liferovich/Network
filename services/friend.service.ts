import { sequelize } from '../database/database.state';

class FriendService {
  async getFriendsIds(id: number) {
    let friendsIds = await sequelize
      .model('Friend')
      .findOne({ where: { UserId: id } });

    if (!friendsIds) {
      throw new Error('Crashed creating friends');
    }

    return friendsIds.get({ plain: true }).friends;
  }

  async getFriends(ids: Array<string>) {
    const friends = await sequelize
      .model('Profile')
      .findAll({ where: { UserId: ids } });

    return friends;
  }
}

export default new FriendService();
