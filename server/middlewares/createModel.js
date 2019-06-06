const mongoose = require('mongoose');

module.exports = (data)=>mongoose.model(data[2], new mongoose.Schema(data[0],data[1]));
