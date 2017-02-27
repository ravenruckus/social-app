const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');

app.disable('x-powered-by');
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/api', require('./routes/api'))
app.use('/api/projects', require('./routes/api_projects'))
app.use('/api/status', require('./routes/api_status'))

app.use((_req, res) => {
  res.sendStatus(400)
})

// eslint-disable-next-line max-params
app.use((err, _req, res, _next) => {
  if (err.output && err.output.statusCode) {
    return res
      .status(err.output.statusCode)
      .set('Content-Type', 'text/plain')
      .send(err.message)
  }

  //eslint-disable-next-line no-console
  console.error(err.stack)
  res.sendStatus(500)
})


module.exports = app;
