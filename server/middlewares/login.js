const colors = require(__dirname + '/../colors');

const jwt = require('jsonwebtoken');
const assert = require('assert');

module.exports = options => {
	return (req, res, next) => {
		let opt
		if (options['mongo']) {
			opt = require('./loginVerificationMongo')(options, req, res)
			.then(docs => {
				options['key'] = docs['_id']
				options['password'] = docs['password']
			})
			.catch(err => console.log(colors.err(err)))
		}
		return require('./loginVerification')(options, req, res);
	};
};
