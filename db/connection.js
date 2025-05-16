require('dotenv').config();
const { Pool } = require('pg');

// Create a new pool instance with your PostgreSQL configuration.
const pool = new Pool({
  user: 'postgres',           // Database user
  host: 'localhost',          // Database host
  database: 'users_db',         // Your database name
  password: "Ace908098!",   // Database password
  port: 5432,                 // Database port
});

const connectToDb = async () => {
  try {
    await pool.connect();
    console.log('Connected to the database successfully!');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

module.exports = { pool, connectToDb };