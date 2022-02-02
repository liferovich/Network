import { sequelize } from '../database.state';
import pkg from 'sequelize';
const { DataTypes } = pkg;

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: sequelize.fn('now'),
  },
  likes: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
  },
  comments: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
});

export default Post;
