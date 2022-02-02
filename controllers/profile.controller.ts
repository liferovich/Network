import express from 'express';
import profileService from '../services/profile.service';

class ProfileController {
  async getProfile(req: express.Request, res: express.Response) {
    try {
      const id = req.params.id;
      const profile = await profileService.getProfile(id);

      return res.json(profile);
    } catch (err: any) {
      if (err.status) {
        res.status(err.status).json({ error: { message: err.message } });
      } else {
        res.status(500).json({ error: { message: 'Server error..' } });
      }
    }
  }

  async getProfiles(req: express.Request, res: express.Response) {
    try {
      const userId = req.body.userId;
      const friendsIds = req.body.friendsIds;
      friendsIds.push(userId);
      const profiles = await profileService.getProfiles(friendsIds);

      return res.json(profiles);
    } catch (err: any) {
      if (err.status) {
        res.status(err.status).json({ error: { message: err.message } });
      } else {
        res.status(500).json({ error: { message: 'Server error..' } });
      }
    }
  }

  async editProfile(req: express.Request, res: express.Response) {
    try {
      const id = req.body.profile.id;
      const profile = req.body.profile;
      const response = await profileService.editProfile(id, profile);

      return res.json(response);
    } catch (err: any) {
      if (err.status) {
        res.status(err.status).json({ error: { message: err.message } });
      } else {
        res.status(500).json({ error: { message: 'Server error..' } });
      }
    }
  }

  async deleteProfile(req: express.Request, res: express.Response) {
    try {
      const id = req.params.id;

      await profileService
        .deleteUser(Number(id))
        .then(function (deletedRecord) {
          if (deletedRecord === 1) {
            res.json({ message: 'Deleted successfully' });
          } else {
            res.json({ message: 'Profile not found' });
          }
        })
        .catch(function (error) {
          res.json(error);
        });
    } catch (err: any) {
      if (err.status) {
        res.status(err.status).json({ error: { message: err.message } });
      } else {
        res.status(500).json({ error: { message: 'Server error..' } });
      }
    }
  }
}

export default new ProfileController();
