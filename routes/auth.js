var express = require('express');
var router = express.Router();
const passport = require('passport');

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
