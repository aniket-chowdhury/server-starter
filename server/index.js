// Setup Initialization
const colors = require('./colors')
require("dotenv").config({
  path: __dirname + `/../${process.env.NODE_ENV}.env`
});

// Required Modules
const express = require('express')
const server = require('./server')

// Variables
const port = process.env.PORT;
const staticDir = __dirname + "/./static/";
const routesDir = __dirname + "/./routes/";
const middlewaresDir = __dirname + "/./middlewares/";

// Express Initialization
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CRUD Routes
app.use("/add", require(routesDir + "addItem"));
app.use("/list", require(routesDir + "listItems"));
app.use("/update", require(routesDir + "updateItem"));
app.use('/delete',require(routesDir + 'deleteItem'))

// Login Routes
app.use('/login',require(routesDir + "loginRoutes"))

//  Testing routes -> to be remove in Production
app.use('/tests',express.static('tests'))
app.use('/',require(middlewaresDir+'auth'))
app.get('/',(req,res)=>{res.status(200).send('okay')})

console.log("\n\b");

app.listen(port, () =>
  console.log(colors.success(`+++ Running at port ${port}`))
);
