import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '', // Replace with your MySQL password
  database: 'edunify'
};

export async function getConnection() {
  const connection = await mysql.createConnection(dbConfig);
  return connection;
}
