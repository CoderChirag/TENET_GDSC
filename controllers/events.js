const Googleuser = require('../models/googleuser');
const Event = require('../models/event');
const Report = require('../models/report');

/** @type {import('express').RequestHandler} */
exports.postRegisterEvent = (req, res) => {
	if (!req.isAuthenticated()) {
		console.log('Unauthorized access of the route.');
		return new Report({
			ips: req.ips,
			ip: req.ip,
			message: `Tried to post on /event/register/${req.params.eventId} outside of the app`,
			description: 'Request was not authenticated',
		})
			.save()
			.then(result => {
				console.log('Report Generated');
				res.status(401)
					.json({
						message:
							'This was reported as an unauthorized action. Strict action would be taken against you',
						code: 401,
					})
					.end();
			})
			.catch(err => {
				console.error(err);
				res.redirect('/');
			});
	}
	if (!req.user) return res.redirect('/');
	let registeredEventIndex = req.user.registeredEvents.events.findIndex(
		e => e.event.toString() === req.params.eventId
	);
	if (registeredEventIndex !== -1) {
		console.log(
			'Unauthorized access of the route as event already registered.'
		);
		return new Report({
			ips: req.ips,
			ip: req.ip,
			message: `Tried to post on /event/register/${req.params.eventId} outside of the app`,
			description: 'User is already registered to the event',
		})
			.save()
			.then(result => {
				console.log('Report Generated');
				res.status(401)
					.json({
						message:
							'This was reported as an unauthorized action. Strict action would be taken against you',
						code: 401,
					})
					.end();
			})
			.catch(err => {
				console.error(err);
				res.redirect('/');
			});
	}

	console.log('Finding Event');
	return Event.findById(req.params.eventId)
		.then(event => {
			if (event) {
				console.log(event);
				console.log('Updating User');
				return Googleuser.findByIdAndUpdate(req.user, {
					$push: {
						'registeredEvents.events': {
							event: req.params.eventId,
							score: 0,
						},
					},
				});
			}
		})
		.then(result => {
			console.log(result);
			req.session.msg = {
				type: 'success',
				info: 'You have successfully registered in the event.',
			};
			return req.session.save(err => {
				if (err) console.log(err);
				res.redirect('/');
			});
		})
		.catch(err => {
			console.log('Error in registering the event: ');
			console.log(err);
			res.redirect('/');
		});
};

/** @type {import('express').RequestHandler} */
exports.postUnregisterEvent = (req, res) => {
	if (!req.isAuthenticated()) {
		console.log('Unauthorized access of the route.');
		return new Report({
			ips: req.ips,
			ip: req.ip,
			message: `Tried to post on /event/unregister/${req.params.eventId} outside of the app`,
			description: 'Request was not authenticated',
		})
			.save()
			.then(result => {
				console.log('Report Generated');
				res.status(401)
					.json({
						message:
							'This was reported as an unauthorized action. Strict action would be taken against you',
						code: 401,
					})
					.end();
			})
			.catch(err => {
				console.error(err);
				res.redirect('/');
			});
	}
	if (!req.user) return res.redirect('/');
	let registeredEventIndex = req.user.registeredEvents.events.findIndex(
		e => e.event.toString() === req.params.eventId
	);
	if (registeredEventIndex === -1) {
		console.log(
			'Unauthorized access of the route as event already registered.'
		);
		return new Report({
			ips: req.ips,
			ip: req.ip,
			message: `Tried to post on /event/unregister/${req.params.eventId} outside of the app`,
			description: 'User is not registered to the event',
		})
			.save()
			.then(result => {
				console.log('Report Generated');
				res.status(401)
					.json({
						message:
							'This was reported as an unauthorized action. Strict action would be taken against you',
						code: 401,
					})
					.end();
			})
			.catch(err => {
				console.error(err);
				res.redirect('/');
			});
	}

	console.log('Finding Event');
	return Event.findById(req.params.eventId)
		.then(event => {
			if (event) {
				console.log(event);
				console.log('Updating User');
				return Googleuser.findByIdAndUpdate(req.user, {
					$pull: {
						'registeredEvents.events': {
							event: req.params.eventId,
						},
					},
				});
			}
		})
		.then(result => {
			console.log(result);
			req.session.msg = {
				type: 'success',
				info: 'You have successfully unregistered from the event.',
			};
			return req.session.save(err => {
				if (err) console.log(err);
				res.redirect('/');
			});
		})
		.catch(err => {
			console.log('Error in registering the event: ');
			console.log(err);
			res.redirect('/');
		});
};
