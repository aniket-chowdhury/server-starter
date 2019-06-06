const mongoose = require('mongoose');
const createModel = require('../middlewares/createModel');

const data = [
	{
		name: { type: String, require: true },
		price: Number,
		qty: { type: Number, default: 0 },
		desc: String
	},
	{
		collection: 'items'
	},
	"Items"
];

module.exports = createModel(data)