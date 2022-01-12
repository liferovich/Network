import { sequelize } from '../database.state';
import pkg from 'sequelize';
import User from './User';
const { DataTypes } = pkg;

const Friend = sequelize.define('Friend', {
  user1_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  user2_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
});

export default Friend;
