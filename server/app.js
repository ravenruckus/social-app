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


module.exports = app;
