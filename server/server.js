const colors = require("./colors");
const mongoose = require("mongoose");


mongoose.set("useFindAndModify", false);

mongoose.Promise = global.Promise;

mongoose.connect(process.env._HOST + process.env._DBNAME, {
  useNewUrlParser: true
});

let db = mongoose.connection;

db.on(
  "error",
  console.error.bind(console, colors.error("--- Connection error"))
);
db.once("open", callback =>
  console.log(colors.success(`+++ Connected to the database[${process.env._DBNAME}]`))
);
