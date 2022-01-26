import express from 'express';
import profileService from '../services/profile.service';

class ProfileController {
  async getProfile(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const id = req.params.id;
      const profile = await profileService.getProfile(id);

      return res.json(profile);
    } catch (e) {
      next(e);
    }
  }

  async getProfiles(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const userId = req.body.userId;
      const friendsIds = req.body.friendsIds;
      friendsIds.push(userId);
      const profiles = await profileService.getProfiles(friendsIds);

      return res.json(profiles);
    } catch (e) {
      next(e);
    }
  }

  async editProfile(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const id = req.body.profile.id;
      const profile = req.body.profile;
      const response = await profileService.editProfile(id, profile);

      return res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  async deleteProfile(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const id = req.params.id;

      await profileService
        .deleteUser(Number(id))
        .then(function (deletedRecord) {
          if (deletedRecord === 1) {
            res.status(200).json({ message: 'Deleted successfully' });
          } else {
            res.status(404).json({ message: 'Profile not found' });
          }
        })
        .catch(function (error) {
          res.status(500).json(error);
        });
    } catch (e) {
      next(e);
    }
  }

  // async editAvatar(
  //   req: express.Request,
  //   res: express.Response,
  //   next: express.NextFunction
  // ) {
  //   try {
  //     const id = req.params.id;

  //     await profileService
  //       .deleteUser(Number(id))
  //       .then(function (deletedRecord) {
  //         if (deletedRecord === 1) {
  //           res.status(200).json({ message: 'Deleted successfully' });
  //         } else {
  //           res.status(404).json({ message: 'record not found' });
  //         }
  //       })
  //       .catch(function (error) {
  //         res.status(500).json(error);
  //       });
  //   } catch (e) {
  //     next(e);
  //   }
  // }
}

export default new ProfileController();
