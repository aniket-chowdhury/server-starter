const mongoose = require('mongoose');

let ItemSchema = new mongoose.Schema(
	{
		name: { type: String, require: true },
		price: Number,
		qty: { type: Number, default: 0 },
		desc: String
	},
	{
		collection: 'items'
	}
);

module.exports = mongoose.model('Items', ItemSchema);
