// @ts-nocheck
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./statex.esm.js');
} else {
  module.exports = require('./statex.dev.esm.js');
}
