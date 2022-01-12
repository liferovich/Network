import { sequelize } from '../database.state';
import pkg from 'sequelize';
import Album from './Album';
const { DataTypes } = pkg;

const Photo = sequelize.define('Photo', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  album_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Album,
      key: 'id',
    },
  },
});

export default Photo;
