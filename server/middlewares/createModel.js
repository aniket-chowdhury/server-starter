const colors = require(__dirname + '/../colors');

const mongoose = require('mongoose');

module.exports = data => {
    try{
        if(!data) throw('Data required. Length of Array must be 3.')
        return mongoose.model(data[2], new mongoose.Schema(data[0], data[1]));
    }
    catch(err){
        console.log(colors.error(err))
    }
};
