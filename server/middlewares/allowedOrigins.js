const colors = require(__dirname + '/../colors');

const fs = require('fs');

const allowedOrigins = (req, res, next) => {
	fs.readFile(__dirname + '/../allowedOrigins.json', (err, fileContents) => {
		if (err) {
			console.log(
				colors.error(
					`!!! Failed to read file. Create ../allowedOrigins.json \n${err}`
				)
			);
			process.exit();
		}
		let flag = false;
		const array = JSON.parse(fileContents)['origins'];
		array.forEach(element => {
			if (req.get('origin') == element) {
				flag=true
				console.log(
					colors.warning(`!!! Warning! Add allowedOrigins.json to .gitignore to prevent ip leaks.`)
				);	
                return next();
			}
		});
		if (!flag) {
			console.log(
				colors.warning(`!!! Unauthorized Access by ${req.get('origin')}`)
			);
			return res.status(404).send(`Not Found`);
		}
	});
};


module.exports = allowedOrigins;
