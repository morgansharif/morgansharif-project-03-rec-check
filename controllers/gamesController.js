var auth = require('../middleware/auth');
var db = require('../models'),
    User = db.User,
    Game = db.Game;

function index(req, res) {
  Game
    .find({})
    .populate('user')
    .exec(function(err, games){
      if (err || !games || !games.length) {
        return res.status(404).send({message: 'Games not found.'})
      }
      res.send(games);
    })
}

function create(req, res){
  var new_game = new Game(req.body);
  new_game.user = req.user_id;
  new_game.save(function(err, new_game){
    res.send(new_game);
  })
}

function show(req, res){
  Game
    .findById(req.params.id)
    .populate('user')
    // .populate('joined_users')
    .exec(function(err, found_game){
      if (err || !found_game) {
        return res.status(404).send({message: 'Game not found.'})
      }

      res.send(found_game);
    })
}

function update(req, res){
  var query = {
    _id: req.params.id
  };

  // if (req.user_id) {
  //   query.user = req.user_id;
  // }

  Game
    .findOneAndUpdate(query, req.body)
    .exec(function(err, game){
      if (err || !game) {
        console.log(game)
        return res.status(404).send({messsage: 'Failed to update game.'})
      }
      res.status(204).send();
    })
}

function destroy(req, res){
  var query = {
    _id: req.params.id
  };

  if (req.user_id) {
    query.user = req.user_id;
  }

  Game
    .findOneAndRemove(query)
    .exec(function(err, game){
      if (err || !game) {
        return res.status(404).send({messsage: 'Failed to delete game.'})
      }
      res.status(204).send();
    })
}

module.exports = {
  index: index
  , create: create
  , show: show
  , update: update
  , destroy: destroy
};
