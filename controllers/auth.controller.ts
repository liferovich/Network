import express from 'express';
import { default as authService } from '../services/auth.service';
import { validationResult } from 'express-validator';

class AuthController {
  async register(req: express.Request, res: express.Response) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: `Validation error ${errors.array()}` });
      }
      const { email, password } = req.body;
      const userData = await authService.register(email, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 ** 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (err: any) {
      if (err.status) {
        res.status(err.status).json({ error: { message: err.message } });
      } else {
        res.status(500).json({ error: { message: 'Server error..' } });
      }
    }
  }

  async login(req: express.Request, res: express.Response) {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      const userData = await authService.login(email, password);

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 ** 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (err: any) {
      if (err.status) {
        res.status(err.status).json({ error: { message: err.message } });
      } else {
        res.status(500).json({ error: { message: 'Server error..' } });
      }
    }
  }

  async logout(req: express.Request, res: express.Response) {
    try {
      const { refreshToken } = req.cookies;
      const token = authService.logout(refreshToken);
      res.clearCookie('refreshToken');

      return res.json(token);
    } catch (err: any) {
      if (err.status) {
        res.status(err.status).json({ error: { message: err.message } });
      } else {
        res.status(500).json({ error: { message: 'Server error..' } });
      }
    }
  }
  async activate(req: express.Request, res: express.Response) {
    try {
      const activationLink = req.params.link;
      await authService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL || '');
    } catch (err: any) {
      if (err.status) {
        res.status(err.status).json({ error: { message: err.message } });
      } else {
        res.status(500).json({ error: { message: 'Server error..' } });
      }
    }
  }
  async refresh(req: express.Request, res: express.Response) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await authService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 ** 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (err: any) {
      if (err.status) {
        res.status(err.status).json({ error: { message: err.message } });
      } else {
        res.status(500).json({ error: { message: 'Server error..' } });
      }
    }
  }
}

export default new AuthController();
