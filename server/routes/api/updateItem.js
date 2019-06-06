const colors = require(__dirname + '/../../colors');

const express = require('express');
const Item = require(__dirname + '/../../models/Item');

const app = express.Router();

const update = require('../../middlewares/crudMethods/update')

app.post('/', update({model:Item}));

module.exports = app;
