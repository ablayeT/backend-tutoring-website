require('dotenv').config();

const keys = {
  client: process.env.CLIENT,
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'ablayetoure@2023',
  database: process.env.DB_NAME || 'db_tutorat',
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
      authPlugin: 'mysql_native_password',
    },
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
};
