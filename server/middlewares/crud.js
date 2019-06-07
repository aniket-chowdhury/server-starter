
const assert = require('assert')
const colors = require(__dirname + '/../colors');

module.exports = (data)=> {
    const app = require('express').Router();

    const middlewareDir = __dirname+'/./crudMethods/'
  
    const Item = data['model']
    
    assert(Item)
        
    app.post('/add', require(middlewareDir + 'add')({model:Item}));

	app.post('/list', require(middlewareDir + 'listId')({model:Item}));
	app.get('/list', require(middlewareDir + 'list')({model:Item}));

    app.post('/update', require(middlewareDir + 'update')({model:Item}));

    app.post('/delete', require(middlewareDir + 'delete')({model:Item}));

	return app;
};
