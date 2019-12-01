const colors = require(__dirname + '/../../colors');

module.exports = data => {
	const Item = data['model'];
	return (req, res, next) => {
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
	};
};
