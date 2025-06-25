let pool;
require('dotenv').config();
const { Pool } = require('pg');

if (process.env.DATABASE_URL) {
  const connectionString = process.env.DATABASE_URL;
  pool = new Pool({
    connectionString: connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });
} else {
  pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
  });
}

const connectToDb = async () => {
  try {
    await pool.connect();
    console.log('Connected to the database successfully!');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

module.exports = { pool, connectToDb };