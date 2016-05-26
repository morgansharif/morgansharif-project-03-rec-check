GamesEditController.$inject = ["$location", "$http", "$routeParams"]; // minification protection
function GamesEditController ($location, $http, $routeParams) {
  var vm = this;
  vm.update = update;
  vm.destroy = destroy;
  vm.game = {}; // form data

  var id = $routeParams.id;
  get(); // fetch one game (show)

  ////

  function update() {
    $http
      .put('/api/games/' + id, vm.game)
      .then(onUpdateSuccess, onUpdateError);

    function onUpdateSuccess(response){
      $location.path("/games/" + id);
    }

    function onUpdateError(response){
      console.error("Failed to update game", response);
    }
  }

  function destroy() {
    $http
      .delete('/api/games/' + id)
      .then(onDeleteSuccess, onDeleteError);

    function onDeleteSuccess(response){
      $location.path("/");
    }

    function onDeleteError(response){
      console.error("Failed to delete game", response);
    }
  }

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
