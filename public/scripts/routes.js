configRoutes.$inject = ["$routeProvider", "$locationProvider"]; // minification protection
function configRoutes($routeProvider, $locationProvider) {

  //this allows us to use routes without hash params!
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $routeProvider
    .when('/', {
      templateUrl: 'templates/games/index.html',
      controller: 'GamesIndexController',
      controllerAs: 'home'
    })
    .when('/signup', {
      templateUrl: 'templates/user/signup.html',
      controller: 'SignupController',
      controllerAs: 'sc',
      resolve: {
        skipIfLoggedIn: skipIfLoggedIn
      }
    })
    .when('/login', {
      templateUrl: 'templates/auth/login.html',
      controller: 'LoginController',
      controllerAs: 'lc',
      resolve: {
        skipIfLoggedIn: skipIfLoggedIn
      }
    })
    .when('/logout', {
      template: null,
      controller: 'LogoutController',
      resolve: {
        loginRequired: loginRequired
      }
    })
    .when('/profile', {
      templateUrl: 'templates/user/profile.html',
      controller: 'ProfileController',
      controllerAs: 'profileCtrl',
      resolve: {
        loginRequired: loginRequired
      }
    })
    .when('/games/new', {
      templateUrl: 'templates/games/new.html',
      controller: 'GamesNewController',
      controllerAs: 'gamesNewCtrl',
      resolve: {
        loginRequired: loginRequired
      }
    })
    .when('/games/:id/edit', {
      templateUrl: 'templates/games/edit.html',
      controller: 'GamesEditController',
      controllerAs: 'gamesEditCtrl',
      resolve: {
        loginRequired: loginRequired
      }
    })
    .when('/games/:id', {
      templateUrl: 'templates/games/show.html',
      controller: 'GamesShowController',
      controllerAs: 'gamesShowCtrl'
    })
    .otherwise({redirectTo: '/'});


    function skipIfLoggedIn($q, $auth) {
      return $auth.isAuthenticated();
    }

    function loginRequired($q, $location, $auth) {
      if (!$auth.isAuthenticated()) {
        $location.path('/login');
      }
    }

}
