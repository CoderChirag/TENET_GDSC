/** @type {import('express').RequestHandler} */
exports.getIndex = (req, res) => {
	console.log(req.isAuthenticated());
	let user = '';
	if (req.isAuthenticated()) {
		user = req.user.username;
	}
	if (req.session.messages) {
		let msg = req.session.messages[0];
		delete req.session.messages;
		return res.send(msg);
	}
	res.render('index', { user });
};
