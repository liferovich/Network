import express from 'express';
import friendService from '../services/friend.service';

class FriendController {
  async getFriends(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const id = req.params.id;
      const friendsIds = await friendService.getFriendsIds(Number(id));

      if (!friendsIds.length) {
        return res.json([]);
      }

      const friends = await friendService.getFriends(friendsIds);

      return res.json(friends);
    } catch (e) {
      next(e);
    }
  }
}

export default new FriendController();
