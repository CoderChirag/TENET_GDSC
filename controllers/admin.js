const Googleuser = require('../models/googleuser');
const Event = require('../models/event');
const Report = require('../models/report');

/** @type {import('express').RequestHandler} */
exports.getAdminUpdateScores = (req, res) => {
	if (!req.isAuthenticated() || !req.user || !req.user.isAdmin) {
		res.redirect('/');
	}
	return res.render('admin/scores', {});
};

/** @type {import('express').RequestHandler} */
exports.postUserScore = (req, res) => {
	if (!req.isAuthenticated() || !req.user || !req.user.isAdmin) {
		console.log('Unauthorized access of the route.');
		return new Report({
			ips: req.ips,
			ip: req.ip,
			message: `Tried to update user score on /admin/update-scores outside of the app`,
			description: `Request was not authenticated${
				req.isAuthenticated() && req.user ? `: ${req.user.email}` : ''
			}`,
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
	console.log(req.body);
	return Googleuser.updateOne(
		{
			email: req.body.email,
			'registeredEvents.events.event': req.body.eventId,
		},
		{
			'registeredEvents.events.$.score': req.body.score,
		}
	)
		.then(result => {
			res.redirect('/admin/update-scores');
		})
		.catch(err => {
			console.log(err);
			res.redirect('/admin/update-scores');
		});
};
