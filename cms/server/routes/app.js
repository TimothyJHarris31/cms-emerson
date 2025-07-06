const express = require('express');
const router = express.Router();

// Default route
router.get('/', (req, res, next) => {
  res.send('Welcome to the CMS API');
});

module.exports = router;
