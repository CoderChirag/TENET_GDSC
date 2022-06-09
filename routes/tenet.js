const express = require('express');
const router = express.Router();

const tenetController = require('../controllers/tenet');

router.get('/', tenetController.getIndex);
router.get('/privacy-policy', tenetController.getPrivacyPolicy);

module.exports = router;
