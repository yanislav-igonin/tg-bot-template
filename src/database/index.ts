import { databaseConfig } from '../config';
import { DataSource } from 'typeorm';

export default new DataSource({
  entities: ['src/database/models/*.model.ts'],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: true,
  type: 'postgres',
  ...databaseConfig,
});
