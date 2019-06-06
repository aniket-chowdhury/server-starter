const colors = require(__dirname + '/../../colors');

const express = require('express');
const Item = require(__dirname + '/../../models/Item');

const add = require('../../middlewares/crudMethods/add')

const app = express.Router();

app.post('/', add({model:Item}));

module.exports = app;
