const colors = require(__dirname + '/../../colors');

const express = require('express');
const Item = require(__dirname + '/../../models/Item');

const deleteItem = require('../../middlewares/crudMethods/delete')

const app = express.Router();

app.post('/', deleteItem({model:Item}));

module.exports = app;
