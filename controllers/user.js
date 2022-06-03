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
	res.redirect('/user/dashboard');
};

/**@type {import("express").RequestHandler} */
exports.getDashboard = (req, res) => {
	if (!req.isAuthenticated()) {
		return res.redirect('/');
	}
	req.user
		.populate('registeredEvents.events.event')
		.execPopulate()
		.then(user => {
			console.log(user);
			console.log(user.registeredEvents.events);
			res.render('user/dashboard', { user });
		})
		.catch(err => {
			console.log(err);
			res.redirect('/');
		});
};

/**@type {import("express").RequestHandler} */
exports.getEvents = (req, res) => {
	if (!req.isAuthenticated()) {
		return res.redirect('/');
	}
	Event.find()
		.then(events => {
			console.log(events);
			res.render('user/events', { user: req.user, events });
		})
		.catch(err => {
			console.log(err);
			res.redirect('/');
		});
};
