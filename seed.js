var db = require("./models");

var user_a = {
  email: "a",
  password: "a",
  displayName: "Alan Perlis"
}

var games = [
  {
    title: "The early bird",
    where: "In software systems, it is often the early bird that makes the worm."
  },
  {
    title: "Purpose",
    where: "Every program has (at least) two purposes: the one for which it was written, and another for which it wasn't."
  },
  {
    title: "Moral",
    where: "One man's constant is another man's variable."
  }
]

db.User.remove({}, function(){
  db.Game.remove({}, function(){
    db.User.create(user_a, function(err, user){
      if (err || !user) { return console.log(err); }
      var user_a_games = games.map(function(p){p.user = user._id; return p;})
      db.Game.create(user_a_games, function(err, games){
          if (err) { return console.log(err); }
          console.log("Created", games.length, "games")
          process.exit()
        }
      )
    })
  });
});
