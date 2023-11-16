import * as models from './models';
import { databaseConfig } from '@/config';
import { Sequelize } from 'sequelize-typescript';

// @ts-expect-error Dialect type is not exported
export const connection = new Sequelize(databaseConfig.url, {
  ...databaseConfig,
  models: models.modelsArray,
});

// @ts-expect-error Sequelize have Op type
export const operators = Sequelize.Op;

// eslint-disable-next-line unicorn/prefer-export-from
export { models };
