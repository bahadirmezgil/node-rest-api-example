require('dotenv').config();
const express = require('express');
const winston = require('winston');

const app = express();

require('./init/security')(app);
require('./init/logging')(app);
require('./init/routes')(app);
require('./init/db')();


const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;
