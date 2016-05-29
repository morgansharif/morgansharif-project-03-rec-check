"use strict";

var db = require("./models");

var user_a = {
  email: "a@a.com",
  password: "a",
  displayName: "Alan Allenson"
};
var joiners = [
  {
    email: "b@b,com",
    password: "b",
    displayName: "Bob Bobson"
  },
  {
    email: "c@c,com",
    password: "c",
    displayName: "Charles Charleston"
  },
  {
    email: "d@d,com",
    password: "d",
    displayName: "Daniel Danson"
  }
];

var games = [
  {
    title: "Quick half-court game",
    where: "That place you know about",
    location: { lat: 37.78, lng: -122.44 },
    start: new Date('2016-05-09T08:00:00.000Z')
  },
  {
    title: "H.O.R.S.E.",
    where: "Somewhere where the horses won't get us.",
    location: { lat: 37.795581, lng: -122.393411 },
    start: new Date('2016-05-09T10:00:00.000Z')
  },
  {
    title: "Proper Game",
    where: "Super secret court.",
    location: { lat: 37.826978, lng: -122.42295 },
    start: new Date('2016-05-30T09:15:00.000Z')
  }
];

var joiner_ids = [];

db.User.remove({}, function(){
  db.Game.remove({}, function(){
    for (let user_seed of joiners){
      db.User.create(user_seed, function(err, user){
        if (err) { return console.log(err); }
        console.log(user._id);
        joiner_ids.push(user._id);
      });
    }
    db.User.create(user_a, function(err, user){
      if (err || !user) { return console.log(err); }
      var user_a_games = games.map(function(p){p.user = user._id, p.joined_users=joiner_ids; return p;});
      db.Game.create(user_a_games, function(err, games){
          if (err) { return console.log(err); }
          console.log("Created", games.length, "games");
          process.exit();
        }
      );
    });
  });
});
