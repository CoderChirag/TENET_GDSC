var express = require('express');
var router = express.Router();

require('../utils/passport');
const adminController = require('../controllers/admin');

router.get('/update-scores', adminController.getAdminUpdateScores);
router.post('/update-scores', adminController.postUserScore);

module.exports = router;
