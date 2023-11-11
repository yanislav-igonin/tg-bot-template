import databaseConfig from 'config/database.config';
import { DataSource } from 'typeorm';

// @ts-expect-error
export default new DataSource(databaseConfig);

