import { sequelize } from '../database.state';
import pkg from 'sequelize';
// import User from './User';
const { DataTypes } = pkg;

const Friend = sequelize.define('Friend', {
  // user_id: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   references: {
  //     model: User,
  //     key: 'id',
  //   },
  // },
  friends: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
  },
});

export default Friend;
