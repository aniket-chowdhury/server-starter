const colors = require(__dirname + '/../colors');

const bcrypt = require('bcrypt');
const assert = require('assert');
const jwt = require('jsonwebtoken');

module.exports = (options, req, res) => {
	try {
		const username = options['username'];
		const password = options['password'];
		const key = options['key'];
		
		if (username && password) {
			if (req.body.username == username) {
				if (bcrypt.compareSync(req.body.password, password)) {
					const data = options['data'] || username;
					const expiry = options['expiry'] || 24 * 60 * 60;
					const key = options['key'];
					try {
						assert(key);
						jwt.sign(
							{ data: data },
							key,
							{ expiresIn: expiry },
							(err, token) => {
								if (err) {
									console.log(colors.error(`--- ${err}`));
									res.status(500).send(
										'Internal Server Error. Error generating token.'
									);
								} else {
									res.status(200).json({ token: token });
								}
							}
						);
					} catch (err) {
						console.log(colors.error(err));
						return res.status(500).send('Internal Server Error');
					}
				}
			} else {
				return res.status(400).send('Username or password not found.');
			}
		} else {
			return res.status(400).send('Username or password not found.');
		}
	} catch (err) {
		console.log(colors.err(err));
		return res.status(501).send('Not implemented')
	}
};
