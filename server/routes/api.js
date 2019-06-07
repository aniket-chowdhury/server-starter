const app = require('express').Router();


const Item = require('../models/Item');

const crud = require('../middlewares/crud');

app.use('/', crud({ model: Item }));
module.exports = app;
