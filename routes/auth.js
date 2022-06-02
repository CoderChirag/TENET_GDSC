var express = require('express');
var router = express.Router();
const passport = require('passport');

// const User = require('../models/GoogleuserSchema');

// router.get(
// 	'/google',
// 	passport.authenticate('google', { scope: ['profile', 'email'] })
// );
// router.get(
// 	'/google/redirect',
// 	passport.authenticate('google', {
// 		failureRedirect: 'http://localhost:2948/login',
// 	}),
// 	function (req, res) {
// 		// req.logIn(req.user, err=>{
// 		//   if (err) throw err;
// 		// console.log("req.user", req.user) })
// 		res.redirect('http://localhost:2948/');
// 	}
// );

router.get('/logout', function (req, res) {
	if (req.isAuthenticated()) {
		req.session.destroy(err => {
			if (err) {
				console.log(error);
			} else {
				res.redirect('/');
			}
		});
	} else {
		res.redirect('/');
	}
});

router.delete('/logout', function (req, res) {
	if (req.isAuthenticated()) {
		req.session.destroy(function () {
			res.send('LOGGED OUT');
		});
	}
});

function checkauth(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		console.log('NOT LOGGED IN');
		return next();
	}
}

module.exports = router;
