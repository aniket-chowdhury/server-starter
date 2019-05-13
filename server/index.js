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

// Express Initialization
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Login Routes
app.use('/login',require(routesDir + "loginRoutes"))

console.log("\n\b");

app.listen(port, () =>
  console.log(colors.success(`+++ Running at port ${port}`))
);
