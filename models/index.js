var mongoose = require('mongoose');
mongoose.connect( 'mongodb://localhost/RecCheckApp' ||
                  process.env.MONGOLAB_URI ||
                  process.env.MONGOHQ_URL );


module.exports = {
  User: require('./user'),
  Game: require('./game')
}
