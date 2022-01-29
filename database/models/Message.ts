import { sequelize } from '../database.state';
import pkg from 'sequelize';
const { DataTypes } = pkg;

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  sender: {
    type: DataTypes.INTEGER,
  },
  text: {
    type: DataTypes.STRING,
  },
});

export default Message;
