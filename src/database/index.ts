import { databaseConfig } from '@/config';
import { Sequelize } from 'sequelize-typescript';

export * as models from './models';

// @ts-expect-error Dialect type is not exported
export const connection = new Sequelize(databaseConfig.url, databaseConfig);

// @ts-expect-error Sequelize have Op type
export const operators = Sequelize.Op;
