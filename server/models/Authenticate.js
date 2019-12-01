const mongoose = require('mongoose');
const createModel = require('../middlewares/createModel');

const data = [
	{
		first: { type: String },
		last: { type: String },
		email: String,
		password: String
	},
	{
		collection: 'authenticates'
	},
	"Authenticates"
];

module.exports = createModel(data)