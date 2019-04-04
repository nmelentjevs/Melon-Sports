if (process.env.NODE_ENV === 'deployment') {
  module.exports = require('./keys_prod');
} else {
  module.exports = require('./keys_dev');
}
