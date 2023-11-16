/**
 * This config file is used by sequelize-cli to generate migrations and seeders.
 * It is also used by the app to connect to the database.
 * Sequelize-cli will use the development config by default.
 * Sequelize-cli doesn't support typescript, so we use javascript here.
 * Sorry, typescript :(
 */

/**
 * Read the .env file and set the environment variables.
 * We need it here because this config file is used by sequelize-cli.
 */
/* eslint-disable node/no-process-env */
// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
require('dotenv').config();

module.exports = {
  dialect: 'postgres',
  logging: false,
  url:
    process.env.DATABASE_URL ??
    'postgresql://postgres:postgres@localhost/postgres',
};
