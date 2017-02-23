const path = require('path');

const reader = require('./src/reader');

const input = path.join(__dirname, process.argv[2]);

const model = reader(input);

console.log(JSON.stringify(model));
