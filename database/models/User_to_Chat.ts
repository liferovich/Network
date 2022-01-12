import { sequelize } from '../database.state';
import pkg from 'sequelize';
import Chat from './Chat';
import User from './User';
const { DataTypes } = pkg;

const User_to_Chat = sequelize.define('User_to_Chat', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  chat_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Chat,
      key: 'id',
    },
  },
});

export default User_to_Chat;
