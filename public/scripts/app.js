angular
  .module('RecCheckApp', [
    'ngRoute',
    'satellizer'
  ])
  .controller('MainController', MainController)
  .controller('GamesIndexController', GamesIndexController)
  .controller('GamesNewController', GamesNewController)
  .controller('GamesShowController', GamesShowController)
  .controller('GamesEditController', GamesEditController)
  .controller('LoginController', LoginController)
  .controller('SignupController', SignupController)
  .controller('LogoutController', LogoutController)
  .controller('ProfileController', ProfileController)
  .service('UserService', UserService)
  .config(configRoutes)
  ;
