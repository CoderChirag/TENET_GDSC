var express = require('express');
var router = express.Router();

require('../utils/passport');
const eventsController = require('../controllers/events');

router.post('/register/:eventId', eventsController.postRegisterEvent);
router.post('/unregister/:eventId', eventsController.postUnregisterEvent);

module.exports = router;
