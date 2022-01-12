import { sequelize } from '../database/database.state.js';
import bcrypt from 'bcrypt';
import uuid from 'uuid';
import { default as mailService } from './mail.service';

class AuthService {
  async register(email: string, password: string) {
    const candidate = await sequelize.model('User').findOne({
      where: {
        email: email,
      },
    });

    if (candidate) throw new Error(`The user with the email ${email} exists!`);
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const user = await sequelize
      .model('User')
      .create({ email, password: hashPassword, activationLink });
    await mailService.sendActivationMail(email, activationLink);
  }
}

export default new AuthService();
