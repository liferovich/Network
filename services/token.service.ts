import jwt from 'jsonwebtoken';
import { sequelize } from '../database/database.state';
import dotenv from 'dotenv';
dotenv.config();

class TokenService {
  generateTokens(payload: { email: string; id: number; isActivated: boolean }) {
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_ACCESS_SECRET || '12345678',
      {
        expiresIn: '30m',
      }
    );
    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET || '12345678',
      {
        expiresIn: '30d',
      }
    );
    return { accessToken, refreshToken };
  }

  validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, 'access-secret-from-nataly');

      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(token, 'refresh-secret-from-nataly');

      return userData;
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId: number, refreshToken: string) {
    const tokenData = await sequelize.model('Token').findOne({
      where: {
        user_id: userId,
      },
    });

    if (tokenData) {
      return await sequelize.model('Token').update(
        {
          refreshToken,
        },
        {
          where: {
            user_id: userId,
          },
        }
      );
    }

    const token = await sequelize.model('Token').create({
      user_id: userId,
      refreshToken,
    });

    return token;
  }

  async removeToken(refreshToken: string) {
    const tokenData = sequelize
      .model('Token')
      .destroy({ where: { refreshToken } });

    return tokenData;
  }

  async findToken(refreshToken: string) {
    const tokenData = sequelize
      .model('Token')
      .findOne({ where: { refreshToken } });

    return tokenData;
  }
}

export default new TokenService();
