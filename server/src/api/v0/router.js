'strict mode';

const express = require('express');

module.exports = (app) => {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.send('API v0 - Development');
  });

  app.use('/api/v0', router);
};