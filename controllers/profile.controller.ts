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
}

export default new ProfileController();
