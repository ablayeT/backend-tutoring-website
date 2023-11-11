require('dotenv').config();

const keys = {
  client: process.env.CLIENT,
  localhost: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

module.exports = {
  development: {
    client: keys.client,
    connection: {
      host: keys.localhost,
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
