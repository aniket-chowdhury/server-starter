const colors = require(__dirname + '/../../colors');

module.exports = data => {
	const Item = data['model'];
	return (req, res, next) => {
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
	};
};
