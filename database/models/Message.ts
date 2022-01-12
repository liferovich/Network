import { sequelize } from '../database.state';
import pkg from 'sequelize';
import User from './User';
import Chat from './Chat';
const { DataTypes } = pkg;

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  chat_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Chat,
      key: 'id',
    },
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Message;
