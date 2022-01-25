import { sequelize } from '../database.state';
import pkg from 'sequelize';
// import User from './User';
const { DataTypes } = pkg;

const Profile = sequelize.define('Profile', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  firstname: {
    type: DataTypes.STRING,
    defaultValue: 'Anon',
  },
  lastname: {
    type: DataTypes.STRING,
    defaultValue: 'Anon',
  },
  age: {
    type: DataTypes.INTEGER,
  },
  sex: {
    type: DataTypes.ENUM,
    values: ['male', 'female'],
    defaultValue: 'male',
  },
  email: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.ENUM,
    values: ['active', 'passive'],
    defaultValue: 'passive',
  },
  avatar: {
    type: DataTypes.STRING,
  },
  instagram: {
    type: DataTypes.STRING,
  },
});

export default Profile;
