import mysql from 'mysql2';
import logger from '../helpers/logger';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  ssl: { rejectUnauthorized: true },
});

export const connect = async () => {
  const connection = pool.promise();
  logger.info('successfully connected to the database');
  return connection;
};

export const disconnect = async (connection) => {
  await connection.releaseConnection();
};
