import { DataSource } from 'typeorm';

export default new DataSource({
  entities: ['src/database/models/*.model.ts'],
  migrations: ['src/database/migrations/*.ts'],
  password: 'postgres',
  synchronize: true,
  type: 'postgres',
  // url: process.env.DATABASE_URL,
  username: 'postgres',
});
