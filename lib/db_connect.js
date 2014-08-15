module.exports = function () {
  var
    mongoose = require('mongoose'),
    env  = {
      'test': 'mongodb://localhost/chatin_test',
      'development': 'mongodb://localhost/chatin'
    },
    url = env[process.env.NODE_ENV || 'development'];

    return mongoose.connect(url);
}