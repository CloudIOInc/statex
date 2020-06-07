// @ts-nocheck
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cloudio-statex.esm.js');
} else {
  module.exports = require('./cloudio-statex.dev.esm.js');
}
