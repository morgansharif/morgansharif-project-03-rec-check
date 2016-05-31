GamesEditController.$inject = ["$location", "$http", "$routeParams", "UserService"]; // minification protection
function GamesEditController ($location, $http, $routeParams, UserService) {
  var vm = this;
  vm.currentUser = UserService.currentUser();
  vm.is_joined = is_joined;  //boolean function checks if current user is in joined_users
  vm.update = update;
  vm.destroy = destroy;
  vm.join_game = join_game;
  vm.leave_game = leave_game;
  vm.game = {}; // form data
  vm.map = { center: { latitude: 37.78, longitude: -122.44 }, zoom: 8 };
  var id = $routeParams.id;
  get(); // fetch one game (show)

  ////
  function is_joined(){
    if (!vm.game._id) {
      return false;
    }
    // var joined_ids = vm.game.joined_users.map(function(user) {return user._id;});
    return vm.game.joined_users.includes(vm.currentUser.user_id);
  }

  function join_game(){
    console.log("joined!");
  }

  function leave_game(){
    console.log("LEAVE GAME");
    // find index of currentUser in game.joined_users of
    // var joined_keys = vm.game.joined_users.map(function(user) {return user._id;});
    var user_index = vm.game.joined_users.findIndex(function(id, index) {
      if (id === vm.currentUser.user_id){
        return true;
      }
      return false;
    });
    // return if user is not found in joined_users
    if (user_index === -1){
      return;
    }
    // remove user from joined user list
    vm.game.joined_users.splice(user_index, 1);
    // update game
    update();
  }

  function update() {
    $http
      .put('/api/games/' + id, vm.game)
      .then(onUpdateSuccess, onUpdateError);

    function onUpdateSuccess(response){
      $location.path("/games/" + id + "/edit");
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
