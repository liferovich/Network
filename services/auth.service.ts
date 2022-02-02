import { sequelize } from '../database/database.state';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { default as mailService } from './mail.service';
import { default as tokenService } from './token.service';
import { UserDto } from '../dto/user.dto';

class AuthService {
  async register(email: string, password: string) {
    const candidate = await sequelize.model('User').findOne({
      where: {
        email: email,
      },
    });

    if (candidate) {
      throw { status: 400, message: `The user with this email exists` };
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuidv4();
    const user = (
      await sequelize
        .model('User')
        .create({ email, password: hashPassword, activationLink })
    ).get({ plain: true });

    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/auth/activate/${activationLink}`
    );

    let userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    await sequelize.model('Profile').create({
      UserId: user.id,
    });
    await sequelize.model('Friend').create({
      UserId: user.id,
    });

    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(activationLink: string) {
    const user = sequelize.model('User').findOne({
      where: {
        activationLink,
      },
    });

    if (!user) {
      throw { status: 400, message: 'Incorrect activation link' };
    }

    await sequelize
      .model('User')
      .update({ isActivated: true }, { where: { activationLink } });
  }

  async login(email: string, password: string) {
    const user = (
      await sequelize.model('User').findOne({
        where: {
          email,
        },
      })
    )?.get({ plain: true });

    if (!user) {
      throw { status: 404, message: 'User with this email doesn`t exist' };
    }

    const isPassEquels = await bcrypt.compare(password, user.password);

    if (!isPassEquels) {
      throw { status: 400, message: 'Invalid password' };
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken: string) {
    const token = await tokenService.removeToken(refreshToken);

    return token;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw { status: 401, message: 'Unathorized user' };
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    console.log('UserDATA: ' + userData);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw { status: 401, message: 'Unathorized user' };
    }

    const user = (
      await sequelize.model('User').findOne({
        where: {
          id: userData.id,
        },
      })
    )?.get({ plain: true });
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
}

export default new AuthService();
