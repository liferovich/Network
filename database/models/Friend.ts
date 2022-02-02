import { sequelize } from '../database.state';
import pkg from 'sequelize';
// import User from './User';
const { DataTypes } = pkg;

const Friend = sequelize.define('Friend', {
  friends: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
  },
});

export default Friend;
