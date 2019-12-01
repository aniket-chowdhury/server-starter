module.exports = (options, req, res) => {
	const mongo = options['mongo'];
	const username = options['username'];
	const password = options['password'];
	let query = {};
	query[username] = req.body.username;

	return mongo
		.findOne(query, '_id password')
		.then(docs => docs)
		.catch(err => console.log(err));
};
