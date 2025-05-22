

const express = require('express');
const router = express.Router();
const promisePool = require('../db');

router.get('/data', async (req, res) => {
  const agentToExclude = 'Mozilla/5.0+(compatible; UptimeRobot/2.0; http://www.uptimerobot.com/)';
  const query = `
    SELECT * 
    FROM table2
    WHERE requestOS != ?
  `;

  try {
    const [results] = await promisePool.query(query, [agentToExclude]);
    console.log('✅ Fetched data:', results);
    res.render('table', { data: results });
  } catch (err) {
    console.error('❌ Error fetching data:', err);
    return res.status(500).send('Error fetching data');
  }
});

module.exports = router;
