const express = require('express');
const router = express.Router();
const pool = require('../db'); // Your MySQL promise-based pool (mysql2/promise)

// Route to create table
router.get('/create', async (req, res) => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS table2 (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      requestIP VARCHAR(255) NOT NULL,
      requestOS VARCHAR(255) NOT NULL,
      requestTime VARCHAR(255) NOT NULL
    )
  `;

  try {
    await pool.query(createTableQuery);
    res.send('✅ Table created');
  } catch (err) {
    console.error('❌ Error creating table:', err.message);
    res.status(500).send('Error creating table');
  }
});

// Route to delete entire table
router.get('/delete', async (req, res) => {
  const query = `DROP TABLE IF EXISTS table2`;

  try {
    await pool.query(query);
    res.send('✅ Table deleted');
  } catch (err) {
    console.error('❌ Error deleting table:', err.message);
    res.status(500).send('Error deleting table');
  }
});

// Route to fetch all data from table
router.get('/data', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM table2');
    res.render('table', { data: rows });  // Assuming your EJS template is named 'table'
  } catch (err) {
    console.error('❌ Error fetching data:', err.message);
    res.status(500).send('Error fetching data');
  }
});

// Route to delete a single row by ID
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM table2 WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).send('❌ No record found with that ID');
    }
    res.sendStatus(200);  // success
  } catch (err) {
    console.error('❌ Error deleting row:', err.message);
    res.status(500).send('Error deleting row');
  }
});

module.exports = router;
