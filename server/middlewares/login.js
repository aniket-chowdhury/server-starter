const colors = require(__dirname + '/../colors');

const jwt = require('jsonwebtoken');
const assert = require('assert');
const bcrypt = require('bcrypt');

const login = options => {
	return (req, res, next) => {
		try {
			if (
				(options['mongo'] && options['password']) ||
				(options['mongo'] && options['key'])
			) {
				throw `Cannot have password and/or key as an option with mongo:true`;
			}

			const configure = options => {
				const model = options['mongo'];
				if (model) {
					const username = docs['username'];
					try {
						mongo.findOne(
							{ username: username },
							'_id password',
							(err, docs) => {
								if (err) {
									throw err;
								}
								const password = docs['password'];
								const key = docs['_id'];
								return {
									username: username,
									password: password,
									key: key
								};
							}
						);
					} catch (err) {
						console.log(colors.err('Failed to respond.'));
						res.status(502).send(
							'Bad Gateway. Data Response Failure.'
						);
					}
				} else {
					return {
						username: options['username'],
						password: options['password'],
						key: options['key']
					};
				}
			};

			const configuration = configure(options);
			options['username'] = configuration['username'];
			options['password'] = configuration['password'];
			options['key'] = configuration['key'];

			const username = configuration['username'];
			const password = configuration['password'];


			if (username && password) {
				if (req.body.username == username) {
					if (
						bcrypt.compareSync(
							req.body.password,
							process.env._PASSWORD
						)
					) {
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
							return res
								.status(500)
								.send('Internal Server Error');
						}
					}
				} else {
					return res
						.status(400)
						.send('Username or password not found.');
				}
			} else {
				return res.status(400).send('Username or password not found.');
			}
		} catch (err) {}
	};
};

module.exports = login
