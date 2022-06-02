var express = require('express');
var router = express.Router();
const passport = require('passport');

// const User = require('../models/GoogleuserSchema');
require('../utils/passport');

router.get(
	'/auth/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
	'/auth/google/redirect',
	passport.authenticate('google', {
		failureRedirect: 'http://localhost:2948/',
		failureMessage: true,
	}),
	function (req, res) {
		// req.logIn(req.user, err=>{
		//   if (err) throw err;
		// console.log("req.user", req.user) })
		res.redirect('http://localhost:2948/');
	}
);

module.exports = router;
