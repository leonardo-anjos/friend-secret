'strict mode';

const express = require('express');

require('./config/database/mongo');
require('./config/server');

module.exports = (app) => {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.send('API v1 - Production');
  });

  require('./routes/person')(router);

  app.use('/api/v1', router);
};