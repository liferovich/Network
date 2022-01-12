import { sequelize } from '../database.state';
import pkg from 'sequelize';
import User from './User';
const { DataTypes } = pkg;

const Album = sequelize.define('Album', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
});

export default Album;
