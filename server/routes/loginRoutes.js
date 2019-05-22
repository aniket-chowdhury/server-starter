const colors = require(__dirname + '/../colors');

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const assert = require('assert');

const app = express.Router();

const login = options => {
	return (req, res, next) => {
		const username = options['username'];
		const password = options['password'];
		if (username && password) {
			if (req.body.username == username) {
				if (
					bcrypt.compareSync(req.body.password, process.env._PASSWORD)
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
						return res.status(500).send('Internal Server Error');
					}
				}
			} else {
				return res.status(400).send('Username or password not found.');
			}
		} else {
			return res.status(400).send('Username or password not found.');
		}
	};
};



app.post(
	'/',
	login({
		username: process.env._USERNAME,
		password: process.env._PASSWORD,
		key: process.env._USERID,
		expiry: 60 * 60 * 24,
		mongo:false
	})
);

module.exports = app;