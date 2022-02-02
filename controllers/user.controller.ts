import express from 'express';
// import { default as userService } from '../services/user.service';

class UserController {
  async getUsers(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      // const users = await authService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL || '');
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
