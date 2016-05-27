// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    auth = require('./middleware/auth'),
    controllers = require("./controllers");

// require and load dotenv
require('dotenv').load();

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files from public folder
app.use(express.static(__dirname + '/public'));
app.use('/vendor', express.static(__dirname + "/bower_components"));


// log api requests
app.use(logger('dev'));

/*
 * Auth Routes
 */

var usersCtrl = controllers.users;
app.post('/auth/signup', usersCtrl.signup);
app.post('/auth/login', usersCtrl.login);
app.get('/api/me', auth.ensureAuthenticated, usersCtrl.showCurrentUser);
app.put('/api/me', auth.ensureAuthenticated, usersCtrl.updateCurrentUser);

/*
 * API Routes
 */

var gamesCtrl = controllers.games;
app.get('/api/games', gamesCtrl.index);
app.post('/api/games', auth.ensureAuthenticated, gamesCtrl.create);
app.get('/api/games/:id', gamesCtrl.show);
app.put('/api/games/:id', auth.ensureAuthenticated, gamesCtrl.update);
app.delete('/api/games/:id', auth.ensureAuthenticated, gamesCtrl.destroy);


/*
 * Catch All Route
 */
app.get(['/', '/signup', '/login', '/logout', '/profile', '/games*'], function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * Listen on localhost:9000
 */
var port = process.env.PORT || 9000;
app.listen(port, function() {
  console.log('server started on port ', port);
});
