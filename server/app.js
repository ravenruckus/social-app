'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.disable('x-powered-by');
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.use('/api', require('./routes/api'))
app.use('/api/projects', require('./routes/api_projects'))
app.use('/api/status', require('./routes/api_status'))
app.use('/api/admin', require('./routes/admin'))
app.use('/api/users', require('./routes/users'))
app.use('/api/tokens', require('./routes/tokens'))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
})

app.use((_req, res) => {
  res.sendStatus(404)
})

// eslint-disable-next-line max-params
app.use((err, _req, res, _next) => {
  console.log(err.output.payload.message);
  if (err.output && err.output.statusCode) {
    return res
      .status(err.output.statusCode)
      .set('Content-Type', 'text/plain')
      .send(err.output.payload.message)
  }

  //eslint-disable-next-line no-console
  console.error(err.stack)
  res.sendStatus(500)
})


module.exports = app;
