import express from 'express';
import userService from '../services/user.service';

class UserController {
  async getUsers(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const users = await userService.getAllUsers();

      return res.json(users);
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
