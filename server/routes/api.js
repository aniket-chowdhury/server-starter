const app = require('express').Router();

const routesDir = __dirname + '/./api/';

app.use('/add', require(routesDir + 'addItem'));
app.use('/list', require(routesDir + 'listItems'));
app.use('/update', require(routesDir + 'updateItem'));
app.use('/delete', require(routesDir + 'deleteItem'));

module.exports = app;
