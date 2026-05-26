import mysql from 'mysql2/promise';

const DB_PASSWORD = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const database = process.env.DB_NAME;

const pool = mysql.createPool({
  host: host,
  user: user,
  password: DB_PASSWORD,
  database: database,
  waitForConnections: true,
  connectionLimit: 100000,
  queueLimit: 0
});

export default pool;