const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('db');
const mysql = require('mysql2');

const indexRouter = require('./routes/index');
const loadRouter = require('./routes/load');
const loginRouter = require('./routes/login');
const submitRouter = require('./routes/submit');
const dataRouter = require('./routes/data');
const tableRouter = require('./routes/table');

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/load', loadRouter);
app.use('/login', loginRouter);
app.use('/submit', submitRouter);
app.use('/', dataRouter);
app.use('/', tableRouter);

// Health check
app.get('/health', (req, res) => {
  res.status(200).send('Server is healthy');
});

// 404 handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Start server
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);

  // Heartbeat log every 5 seconds (for testing)
  setInterval(() => {
    console.log(`[HEARTBEAT] Server is alive at ${new Date().toLocaleString()}`);
  }, 5000);
});

module.exports = app;
