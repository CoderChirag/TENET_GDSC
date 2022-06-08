const passport = require('passport');

const Event = require('../models/event');

exports.getGoogleAuth = passport.authenticate('google', {
	scope: ['profile', 'email'],
});

exports.getGoogleAuthRedirect = passport.authenticate('google', {
	failureRedirect: '/',
	failureMessage: true,
});

/**@type {import("express").RequestHandler} */
exports.getGoogleAuthRedirectHandler = (req, res) => {
	res.redirect('/');
};
