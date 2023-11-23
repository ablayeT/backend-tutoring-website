require('dotenv').config();

const keys = {
  client: process.env.CLIENT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

module.exports = {
  development: {
    client: keys.client,
    version: '8.1',
    connection: {
      host: keys.host,
      port: keys.port,
      user: keys.user,
      password: keys.password,
      database: keys.database,
    },
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
};
