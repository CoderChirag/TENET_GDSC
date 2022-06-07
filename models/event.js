const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	posterUrl: String,
	description: String,
});

module.exports = mongoose.model('Event', eventSchema);
