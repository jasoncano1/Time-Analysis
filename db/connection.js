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

connectToDb();

pool.query('SELECT * FROM tasks', (err, res) => {
  if (err) {
    console.error('Error executing query', err.stack);
  } else {
    console.log('Current time:', res.rows[0]);
  }
}
);

// import pg from 'pg'
// const { Client } = pg
// const client = new Client()

// client.connect((err) => {
//    client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
//      console.log(err ? err.stack : res.rows[0].message) // Hello World!
//      client.end()
//    })
// })
