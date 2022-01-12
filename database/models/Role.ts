import { sequelize } from '../database.state';
import pkg from 'sequelize';
const { DataTypes } = pkg;

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  role: {
    type: DataTypes.ENUM,
    values: ['admin', 'editor', 'user'],
    defaultValue: 'user',
  },
});

export default Role;
