var express = require('express');
var router = express.Router();

require('../utils/passport');
const userController = require('../controllers/user');

router.get('/auth/google', userController.getGoogleAuth);

router.get(
	'/auth/google/redirect',
	userController.getGoogleAuthRedirect,
	userController.getGoogleAuthRedirectHandler
);

module.exports = router;
