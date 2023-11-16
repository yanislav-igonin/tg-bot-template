import { databaseConfig } from '@/config';
import { Sequelize } from 'sequelize-typescript';

export * as models from './models';

export const connection = new Sequelize(databaseConfig.url, databaseConfig);

// @ts-expect-error Sequelize have Op type
export const operators = Sequelize.Op;
