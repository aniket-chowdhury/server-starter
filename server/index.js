// Setup Initialization
const colors = require('./colors');

// ENVIRONMENT VARIABLE INITIALIZATION
try {
	if (!process.env.NODE_ENV) {
		throw 'No environment specified.';
	}
	require('dotenv').config({
		path: __dirname + `/../${process.env.NODE_ENV}.env`
	});
} catch (err) {
	console.log(
		colors.error('--- Environment Variable missing. Specify env variable.\n'),
		colors.warning('\b+++ Use npm run start-dev for development server.')
	);
	process.exit(500);
}

// Required Modules
const express = require('express');
const server = require('./server');
const cors = require('cors')

// Variables
const port = process.env.PORT;
const staticDir = __dirname + '/./static/';
const routesDir = __dirname + '/./routes/';
const middlewaresDir = __dirname + '/./middlewares/';

// Express Initialization
const app = express();
app.use(
	express.urlencoded({
		extended: true
	})
);
app.use(express.json());
app.use(cors())
app.use(require(middlewaresDir+'allowedOrigins'))

// CRUD Routes
app.use('/api', require(middlewaresDir + 'auth'));
app.use('/api', require(routesDir + 'api'));

// Login Routes
app.use('/login', require(routesDir + 'loginRoutes'));

//  Testing routes -> to be remove in Production
app.use('/tests', express.static('tests'));
app.use('/', require(middlewaresDir + 'auth'));
app.get('/', (req, res) => {
	res.status(200).send('okay');
});

console.log('\n\b');

app.listen(port, () =>
	console.log(colors.success(`+++ Running at port ${port}`))
);
