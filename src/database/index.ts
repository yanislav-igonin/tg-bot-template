import { Sequelize } from 'sequelize-typescript';

export * as models from './models';

export const connection = new Sequelize({
  database: process.env.DATABASE_NAME,
  dialect: 'postgres',
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  models: [__dirname + '/models'],
});

// @ts-expect-error
export const operators = Sequelize.Op;
