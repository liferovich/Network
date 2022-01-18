import { sequelize } from '../database.state';
import pkg from 'sequelize';
import User from './User';
const { DataTypes } = pkg;

const Profile = sequelize.define('Profile', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sex: {
    type: DataTypes.ENUM,
    values: ['male', 'female'],
    defaultValue: 'male',
  },
  avatar: {
    type: DataTypes.STRING,
  },
  instagram: {
    type: DataTypes.STRING,
  },
});

export default Profile;
