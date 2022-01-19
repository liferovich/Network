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
}

export default new ProfileController();
