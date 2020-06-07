const fs = require('fs');

fs.copyFileSync('./scripts/cjs.js', './dist/index.cjs.js');
fs.copyFileSync('./scripts/esm.js', './dist/index.esm.js');
