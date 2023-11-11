import { MessageModel, UserModel } from './models';
import { DataSource } from 'typeorm';

export const database = new DataSource({
  entities: [MessageModel, UserModel],
  synchronize: true,
  type: 'postgres',
  url: process.env.DATABASE_URL,
});

database.initialize();