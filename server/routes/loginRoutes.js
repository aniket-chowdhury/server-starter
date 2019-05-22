const colors = require(__dirname + '/../colors');

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const assert = require('assert');

const app = express.Router();

const getJWT = options => {};

const login = require('../middlewares/login')

app.post(
	'/',
	login({
		username: process.env._USERNAME,
		password: process.env._PASSWORD,
		key: process.env._USERID,
		expiry: 60 * 60 * 24,
		mongo: false
	})
);

module.exports = app;
// export default app;
