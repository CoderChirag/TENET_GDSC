const path = require('path');

const Googleuser = require('../models/googleuser');
const Event = require('../models/event');

/** @type {import('express').RequestHandler} */
exports.getIndex = (req, res) => {
	console.log(req.isAuthenticated());
	let eventsData = {};
	return Event.find()
		.then(events => {
			// console.log('Events Data: ');
			// console.log(events);
			eventsData = events;
			if (!req.isAuthenticated() || !req.user) {
				return {};
			}
			return req.user
				.populate('registeredEvents.events.event')
				.execPopulate();
		})
		.then(user => {
			if (!req.isAuthenticated() || !req.user) {
				if (req.session.messages) {
					let message = {};
					console.log(req.session.messages);
					message.info = req.session.messages[0];
					message.type = 'error';
					delete req.session.messages;
					return req.session.save(err => {
						if (err) console.log(err);
						res.render('index', {
							isAuthenticated: false,
							user: {},
							events: eventsData,
							message,
						});
					});
				}
				return res.render('index', {
					isAuthenticated: false,
					user: {},
					events: eventsData,
					message: {},
				});
			}
			if (req.session.msg) {
				let msg = req.session.msg;
				console.log(msg);
				delete req.session.msg;
				return req.session.save(err => {
					if (err) console.log(err);
					res.render('index', {
						isAuthenticated: true,
						user,
						events: eventsData,
						message: msg,
					});
				});
			}
			// console.log('User Data: ');
			// console.log(user);
			// console.log('User registered Events: ');
			// console.log(user.registeredEvents.events);
			return res.render('index', {
				isAuthenticated: true,
				user,
				events: eventsData,
				message: {},
			});
		})
		.catch(err => {
			console.log('Error at main page: ', err);
			res.redirect('/logout');
		});
};

/** @type {import('express').RequestHandler} */
exports.getPrivacyPolicy = (req, res) => {
	res.sendFile(path.join(__dirname, '../views/privacy-policy.html'));
};
