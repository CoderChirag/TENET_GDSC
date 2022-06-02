const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const googleuserSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		img: {
			type: String,
			default: '',
		},
		extra1: { default: {} },
		extra2: { default: {} },
		date: { type: Date, default: Date.now },
		isAdmin: { type: Boolean, default: 0 },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Googleuser', googleuserSchema);
