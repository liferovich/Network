import express from 'express';
import { default as authService } from '../services/auth.service';
import { validationResult } from 'express-validator';
import { ApiError } from '../exceptions/api.error';

class AuthController {
  async register(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error', errors.array()));
      }
      const { email, password } = req.body;
      const userData = await authService.register(email, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 ** 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async login(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { email, password } = req.body;
      const userData = await authService.login(email, password);

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 ** 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async logout(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { refreshToken } = req.cookies;
      const token = authService.logout(refreshToken);
      res.clearCookie('refreshToken');

      return res.json(token);
    } catch (e) {
      next(e);
    }
  }
  async activate(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const activationLink = req.params.link;
      await authService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL || '');
    } catch (e) {
      next(e);
    }
  }
  async refresh(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await authService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 ** 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}

export default new AuthController();
