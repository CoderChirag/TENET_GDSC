/** @type {import('express).RequestHandler} */
exports.getLogout = function (req, res) {
	if (req.isAuthenticated()) {
		req.session.destroy(err => {
			if (err) {
				console.log(error);
				res.redirect('/');
			} else {
				res.redirect('/');
			}
		});
	} else {
		res.redirect('/');
	}
};

/** @type {import('express).RequestHandler} */
exports.deleteLogout = function (req, res) {
	if (req.isAuthenticated()) {
		req.session.destroy(function () {
			res.send('LOGGED OUT');
		});
	}
};
