const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reportSchema = new Schema(
	{
		ips: {
			type: Array,
			required: true,
		},
		ip: {
			type: String,
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Report', reportSchema);
