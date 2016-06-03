#RecCheck

Link to heroku deployment
##About RecCheck
RecCheck is an app that helps users find and host local pickup games, at public or private courts, addressing real-world issues with the current state of pickup basketball. The primary pain points this app addresses are: searching for courts with players, and spending time to visit a court only to find it empty, or short of willing players for the desired game. With RecCheck users can need only create an account and search for a game during their availablity or host one themselves.

##Technologies Used
#####MEAN Stack
`MongoDB` `Express.js` `Angular.js` `Node.js`
#####Languages/Libraries
`JavaScript` `HTML5` `CSS3` `Bootstrap` `lodash`

#####Middleware/Directives:
`satellizer` `angular-google-maps` `angular-google-places-autocomplete`


##Installation
####Download/Unpack
1. **Fork** and **clone** this repo.
2. `cd` into the cloned directory
3. run `$ npm install` (if bower does not automatically install after npm, run `$ bower install`)
4. `touch .env` file and assign a string of characters (no quotes) to `TOKEN_SECRET=` to be used for encryption

####Download/Unpack
1. run `$ mongod` wait until connection is made before proceeding
2. run `$ node seed.js` to set up a basic seed
3. run `$ nodemon` and open `http://localhost:<PORT#>/`
4. Create a user account to enjoy all priveleges.


##User Stories
####Non-Account & Logged-Out Users:

* Are redirected to login/create acct if they click to visit games-show pages
* May create an accounts
* May log in to an existing account with username and password

####All Visitors:
* May view the games-index page and:
	* Sort through games by date and look at details
	* Interact with the map


####Logged-In Users:

* May access games-show pages
	* Join/Leave upcoming games
	* `As current game author:`
		* Edit game title
		* Cancel game

##WireFrames
RecCheck is an upcoming iOS app, and its web-app counterpart's wireframes and user-flow follows the same guidelines. For examples of the iOS wireframe and flow visit: [RecCheck](http://www.reccheckapp.com/#how-it-works-section "RecCheck")

##ERD
Currently, the models consist of:
####User
*   `created`: Date.now (on creation)
*   `updated`: Date
*   `email`: String, unique: true, lowercase: true
*   `password`: String 
*   `displayName`: String


####Game

* `user`: reference to User model who authored this game (`user._id`)
* `joined_users`: array of joined user references (`[user._id's]`)
* `title`: String
* `where`: String
*   `start`: Date
*   `location`: {
	*     `lat`: String
	*     `lng`: String }	

##Planned Development
* Google directions link on game-show page
* Viewable user-show pages
* Allow users to add each other as friends
* Allow users to invite friends to games they have joined
	* Users can accept/deny friend requests and invites
* OAuth Account creation/sign-in via Facebook