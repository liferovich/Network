import { sequelize } from '../database.state';
import pkg from 'sequelize';
import User from './User';
const { DataTypes } = pkg;

const Token = sequelize.define('Token', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Token;
