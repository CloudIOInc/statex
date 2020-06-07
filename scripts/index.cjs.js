// @ts-nocheck
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./statex.cjs.js');
} else {
  module.exports = require('./statex.dev.cjs.js');
}
