import mysql from 'mysql2/promise';
import config from './index';

const pool = mysql.createPool({
  connectionLimit: 10,
  host: config.database.host,
  post: config.database.port,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database,
});

export const query = (quertText, params) => {
  return new Promise((resolve, reject) => {
    pool.query(quertText, params, (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

export const clientConnect = async () => {
  return pool.getConnection()
};
