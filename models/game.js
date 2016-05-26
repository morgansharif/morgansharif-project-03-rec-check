var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var gameSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  where: String
});

var Game = mongoose.model('Game', gameSchema);
module.exports = Game;
