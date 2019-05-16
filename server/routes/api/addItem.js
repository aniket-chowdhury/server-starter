const colors = require(__dirname + '/../../colors');

const express = require('express');
const Item = require(__dirname + '/../../models/Item');

const app = express.Router();

app.post('/', (req, res, next) => {
	const data = new Item(req.body);
	data.save(err => {
		if (err) {
			console.log(colors.error(`--- ${err}`));
			res.status(500).send(
				"Internal Server Error. Can't save to database"
			);
		} else {
			res.status(200).json({ success: true });
		}
	});
});

module.exports = app;
