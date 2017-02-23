const path = require('path');

const reader = require('./src/reader');
const solver = require('./src/solvers/simple');

const input = path.join(__dirname, process.argv[2]);

const model = reader(input);
const solution = solver(model);

console.log(JSON.stringify(solution));
