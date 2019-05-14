const colors = require(__dirname + '/../colors');

const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
	const token =
		req.body.token || req.query.token || req.headers['x-access-token'];
	if (!token) {
		return res.status(401).send('Token not found');
	}
	jwt.verify(token, process.env._USERID, (err, decoded) => {
		if (err) {
			return res.status(403).send('Failed to verify');
		}
		return next();
	});
};

module.exports = auth;
