const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
  res.send('Hello World! [GET from users.js]');
});

router.post('/', (req, res) => {
  res.send('Hello World! [POST from users.js]');
});

router.delete('/:id', (req, res) => {
  res.send('Hello World! [DELETE from users.js]');
});

module.exports = router;

