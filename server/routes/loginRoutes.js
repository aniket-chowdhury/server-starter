const colors = require(__dirname + '/../colors');

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express.Router();

app.post('/', (req, res, next) => {
	if (req.body.username == process.env._USERNAME) {
		if (bcrypt.compareSync(req.body.password, process.env._PASSWORD)) {
			jwt.sign(
				{ data: process.env._USERNAME },
				process.env._USERID,
				{ expiresIn: 60 * 60 * 24 },
				(err, token) => {
					if (err) {
						console.log(colors.error(`--- ${err}`));
						res.status(500).send('Error generating token');
					} else {
						res.status(200).json({ token: token });
					}
				}
			);
		} else {
			res.status(401).send('Username or password not found.');
		}
	} else {
		res.status(400).send('Username or password not found.');
	}
});

module.exports = app;
