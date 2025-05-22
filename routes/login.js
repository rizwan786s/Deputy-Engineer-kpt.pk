const express = require('express');
const router = express.Router();

// 👇 Change this to control the expected query parameter name
const QUERY_PARAM_NAME = 'gdgdsdh';

router.get('/', (req, res, next) => {
  const queryValue = req.query[QUERY_PARAM_NAME];

  console.log(`✅ /login route hit. Query param '${QUERY_PARAM_NAME}':`, queryValue);

  if (!queryValue) {
    return res.status(400).send(`❌ Missing or empty query parameter: '${QUERY_PARAM_NAME}'`);
  }

  res.render('login', { data: queryValue });
});

module.exports = router;
