angular
  .module('RecCheckApp', [
    'ngRoute',
    'satellizer',
    'ui.bootstrap',
    'ui.bootstrap.datetimepicker'
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
  .controller('DateTimePickerController', DateTimePickerController)
  .service('UserService', UserService)
  .config(configRoutes)
  ;
