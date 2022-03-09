import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

export const sequelize = new Sequelize(
  'network',
  'postgres',
  'ONM08112021onm',
  {
    host: 'localhost',
    dialect: 'postgres',
  }
);
