GamesShowController.$inject = ["$location", "$http", "$routeParams"]; // minification protection
function GamesShowController ($location, $http, $routeParams) {
  var vm = this;
  vm.game = {};

  var id = $routeParams.id;
  get(); // fetch one game (show)

  ////

  function get() {
    $http
      .get('/api/games/' + id)
      .then(onGetSuccess, onGetError);

    function onGetSuccess(response){
      vm.game = response.data;
    }

    function onGetError(response){
      console.error("Failed to get game", response);
      $location.path("/");
    }
  };
}
