const express = require('express');
const bodyParser = require('body-parser');

const api = require('./api/api.js');

const app = express();

app.use(bodyParser.urlencoded( {extended: false}));

app.use('/asq/api', api.router);

module.exports = app;