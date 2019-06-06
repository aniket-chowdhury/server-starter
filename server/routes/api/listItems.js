const colors = require(__dirname + '/../../colors');

const express = require('express');

const Item = require(__dirname + '/../../models/Item')

const list = require('../../middlewares/crudMethods/list')
const listId = require('../../middlewares/crudMethods/listId')

const app = express.Router();

app.post('/', listId({model:Item}));

app.get('/', list({model:Item}));

module.exports = app;
