const colors = require("./colors");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/conjecture", {
  useNewUrlParser: true
});

let db = mongoose.connection;

db.on(
  "error",
  console.error.bind(console, colors.error("--- Connection error"))
);
db.once("open", callback =>
  console.log(colors.success("+++ Success[conjecture]"))
);
