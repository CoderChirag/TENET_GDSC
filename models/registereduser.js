const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const registereduserSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	isAdmin: {
		type: Boolean,
		default: 0,
	},
});

module.exports = mongoose.model('Registereduser', registereduserSchema);
