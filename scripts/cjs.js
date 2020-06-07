// @ts-nocheck
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./index.cjs.js');
} else {
  module.exports = require('./index.dev.cjs.js');
}
