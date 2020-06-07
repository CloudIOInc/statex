// @ts-nocheck
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./index.esm.js');
} else {
  module.exports = require('./index.dev.esm.js');
}
