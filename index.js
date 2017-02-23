const fs = require('fs');
const path = require('path');

const reader = require('./src/reader');
const solver = require('./src/solvers/simple');
const formatter = require('./src/formatter');

const inFile = process.argv[2];
const input = fs.readFileSync(path.join(__dirname, inFile)).toString()

const model = reader(input);
const caches = solver(model);
const output = formatter(caches);

const outFileName = path.basename(inFile, path.extname(inFile));
const outFile = path.join(__dirname, 'out', `${outFileName}.out`);

fs.writeFileSync(outFile, output);
