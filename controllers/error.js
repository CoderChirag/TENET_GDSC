/**@type {import("express").RequestHandler} */
exports.get404 = (req, res) => {
	res.render('404', {});
};
