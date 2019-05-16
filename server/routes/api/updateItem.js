const colors = require(__dirname + '/../../colors');

const express = require('express');
const Item = require(__dirname + '/../../models/Item');

const app = express.Router();

app.post('/', (req, res, next) => {
	const id = req.body.itemId || req.query.itemId;
	if (id) {
		Item.findByIdAndUpdate(id, req.body, err => {
			if (err) {
				console.log(colors.error(`--- ${err}`));
				res.status(502).send('Bad Gateway. Data Response Failure.');
			} else {
				res.status(200).json({ success: true });
			}
		});
	} else {
		res.status(417).send('Expectation failed.');
	}
});

module.exports = app;
