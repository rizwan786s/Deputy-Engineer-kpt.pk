const mysql = require('mysql2');
require('dotenv').config();



// Create MySQL Pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'tiger',
  password: 'root',
  database: 'testdb',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Initialize DB Table (only once when app starts)
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ MySQL connection error:', err.message);
    return;
  }

  console.log('✅ Connected to MySQL (via pool)');

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS table1 (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      requestIP VARCHAR(255) NOT NULL,
      requestOS VARCHAR(255) NOT NULL,
      requestTime VARCHAR(255) NOT NULL
    )
  `;

  connection.query(createTableQuery, (err, results) => {
    if (err) {
      console.error('❌ Error creating table:', err.message);
    } else {
      console.log('✅ Table is ready');
    }
    connection.release(); // Make sure to always release the connection
  });
});

// Export a promise-based pool (optional)
const promisePool = pool.promise();

module.exports = promisePool;
