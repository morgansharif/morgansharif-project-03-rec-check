var mongoose = require('mongoose');
mongoose.connect( 'mongodb://localhost/reccheck' ||
                  process.env.MONGOLAB_URI ||
                  process.env.MONGOHQ_URL );


module.exports = {
  User: require('./user')
  , Post: require('./game')
}
