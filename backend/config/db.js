const { Pool } = require('pg');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
});

// Function to initialize database tables
const initializeDatabase = async () => {
  try {
    // Read the init.sql file
    const initSQL = fs.readFileSync(path.join(__dirname, 'init.sql'), 'utf8');
    
    // Execute the SQL commands
    await pool.query(initSQL);
    console.log('Database tables initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

// Initialize database when the module is loaded
initializeDatabase();

module.exports = pool; 