const chalk = require('chalk');

const error = chalk.bold.red;
const warning = chalk.keyword('orange');
const success = chalk.bold.blue;

module.exports.error = error;
module.exports.warning = warning;
module.exports.success = success;
