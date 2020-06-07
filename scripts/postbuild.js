const fs = require('fs');

fs.copyFileSync('./scripts/index.cjs.js', './dist/index.cjs.js');
fs.copyFileSync('./scripts/index.esm.js', './dist/index.esm.js');
