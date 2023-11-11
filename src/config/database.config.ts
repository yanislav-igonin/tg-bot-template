export default {
  entities: ['src/database/models/*.model.ts'],
  migrations: ['src/database/migrations/*.ts'],
  type: 'postgres',
  url: process.env.DATABASE_URL,
}