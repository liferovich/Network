import { sequelize } from '../database/database.state';

class FriendService {
  async getFriendsIds(id: number) {
    const friendsIds = await sequelize
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

  async addFriendId(id: number, friendsIds: [number]) {
    let friends = await sequelize
      .model('Friend')
      .update(
        { friends: friendsIds },
        { where: { UserId: id }, returning: true }
      );

    if (!friends) {
      throw new Error('Crashed adding friends');
    }

    const data = friends[1][0].get();

    return data.friends;
  }

  async deleteFriendId(id: number, friendsIds: [number]) {
    let friends = await sequelize
      .model('Friend')
      .update(
        { friends: friendsIds },
        { where: { UserId: id }, returning: true }
      );

    if (!friends) {
      throw { status: 500, message: 'Crashed deleting friends' };
    }
    const data = friends[1][0].get();
    return data.friends;
  }
}

export default new FriendService();
