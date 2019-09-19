const express = require('express');
const record = require('../routes/record');
const swagger = require('../routes/swagger');
const errorMiddleware = require('../middlewares/error');
const languageMiddleware = require('../middlewares/language');

module.exports = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json()); // request parsing
  app.use(languageMiddleware); // sets default language if not defined
  app.use('/api/record', record);
  app.use('/api/swagger', swagger); // interface and documentation
  app.use(errorMiddleware);
};
