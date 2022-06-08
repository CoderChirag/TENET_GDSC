const express = require('express');
const router = express.Router();

const tenetController = require('../controllers/tenet');

router.get('/', tenetController.getIndex);

module.exports = router;
