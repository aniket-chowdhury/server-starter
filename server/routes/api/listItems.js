const colors = require(__dirname + '/../../colors');

const express = require('express');
const Item = require(__dirname + '/../../models/Item');

const app = express.Router();

app.post('/', (req, res, next) => {
	const id = req.body.itemId || req.query.itemId;
	if (id) {
		Item.findById(id, (err, elem) => {
			if (err) {
				console.log(colors.error(`--- ${err}`));
				res.status(502).send('Bad Gateway. Data Response Failure.');
			} else {
				res.status(200).send(elem);
			}
		});
	} else {
		res.status(417).send('Expectation failed.');
	}
});

app.get('/', (req, res, next) => {
	Item.find({}, (err, docs) => {
		if (err) {
			console.log(colors.error(`--- ${err}`));
			res.status(502).send('Bad Gateway. Data Response Failure.');
		} else {
			res.status(200).json(docs);
		}
	});
});

module.exports = app;
