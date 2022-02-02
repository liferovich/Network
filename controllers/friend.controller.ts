import express from 'express';
import friendService from '../services/friend.service';

class FriendController {
  async getFriends(req: express.Request, res: express.Response) {
    try {
      const id = req.params.id;
      const friendsIds = await friendService.getFriendsIds(Number(id));

      if (!friendsIds.length) {
        return res.json([]);
      }

      const friends = await friendService.getFriends(friendsIds);

      return res.json({ friends, friendsIds });
    } catch (err: any) {
      if (err.status) {
        res.status(err.status).json({ error: { message: err.message } });
      } else {
        res.status(500).json({ error: { message: 'Server error..' } });
      }
    }
  }

  async addFriend(req: express.Request, res: express.Response) {
    try {
      const id = req.params.id;
      const { friendId } = req.body;
      const friendsIds = (await friendService.getFriendsIds(Number(id))) || [];
      if (friendsIds.indexOf(friendId) === -1) {
        friendsIds.unshift(friendId);
      }
      const friendsArr = await friendService.addFriendId(
        Number(id),
        friendsIds
      );

      if (!friendsArr.length) {
        return res.json([]);
      }

      const friends = await friendService.getFriends(friendsArr);

      return res.json({ friends, friendsIds });
    } catch (err: any) {
      if (err.status) {
        res.status(err.status).json({ error: { message: err.message } });
      } else {
        res.status(500).json({ error: { message: 'Server error..' } });
      }
    }
  }

  async deleteFriend(req: express.Request, res: express.Response) {
    try {
      const id = req.params.id;
      const { friendId } = req.body;
      const friendsIds = (await friendService.getFriendsIds(Number(id))) || [];
      const index = friendsIds.indexOf(friendId);

      if (index === -1) {
        throw new Error('Crashed deleting friends');
      }

      friendsIds.splice(index, 1);
      const friendsArr = await friendService.deleteFriendId(
        Number(id),
        friendsIds
      );

      if (!friendsArr.length) {
        return res.json([]);
      }

      const friends = await friendService.getFriends(friendsArr);

      return res.json({ friends, friendsIds });
    } catch (err: any) {
      if (err.status) {
        res.status(err.status).json({ error: { message: err.message } });
      } else {
        res.status(500).json({ error: { message: 'Server error..' } });
      }
    }
  }
}

export default new FriendController();
