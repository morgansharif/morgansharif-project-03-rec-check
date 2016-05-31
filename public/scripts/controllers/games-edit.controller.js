GamesEditController.$inject = ["$location", "$http", "$routeParams", "UserService"]; // minification protection
function GamesEditController ($location, $http, $routeParams, UserService) {
  var vm = this;
  vm.update = update;
  vm.destroy = destroy;
  vm.game = {}; // form data
  var id = $routeParams.id;
  vm.currentUser = UserService.currentUser();
  vm.is_joined = is_joined;
  vm.map = { center: { latitude: 37.78, longitude: -122.44 }, zoom: 8 };
  vm.join_game = join_game;

  get(); // fetch one game (show)

  ////
  function is_joined(){
    if (!vm.game._id) {
      return false;
    }
    var joined_keys = vm.game.joined_users.map(function(user) {return user._id;});
    var is_joined = joined_keys.includes(vm.currentUser.user_id);
    return is_joined;
  }
  function join_game(){
    console.log("joined!");
  }

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
      vm.isauthor = false || vm.game.user._id === vm.currentUser.user_id;
      vm.map = { center: { latitude: vm.game.location.lat, longitude: vm.game.location.lng }, zoom: 16 };
    }

    function onGetError(response){
      console.error("Failed to get game", response);
      $location.path("/");
    }
  };
}
