const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');

router.get('/logout', authController.getLogout);

router.delete('/logout', authController.deleteLogout);

module.exports = router;
