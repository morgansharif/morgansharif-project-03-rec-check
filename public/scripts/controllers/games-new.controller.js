GamesNewController.$inject = ["$location", "$http"]; // minification protection
function GamesNewController ($location, $http) {
  var vm = this;
  vm.create = create;
  vm.map = { center: {latitude: 37.78, longitude: -122.44 }, zoom: 12 };
  vm.autoAddress = {};
  vm.game = {}; // form data

  vm.cansubmit = cansubmit;
  function cansubmit(){
  return vm.autoAddress.hasOwnProperty("geometry");
}

  function create() {
    // prevent creating a game without autocomplted coordinates and name values
    if ((!vm.autoAddress.hasOwnProperty("geometry")) || (!vm.autoAddress.hasOwnProperty("name"))){
      return;
    }
    // assign autocomplete info to game model before creating
    vm.game.where = vm.autoAddress.name;
    vm.game.location = vm.autoAddress.geometry.location;
    // http POST final game model
    $http
      .post('/api/games', vm.game)
      .then(onCreateSuccess, onCreateError);

    function onCreateSuccess(response){
      $location.path('/games/' + response.data._id)
    }

    function onCreateError(response){
      console.error("Failed to create game", response);
    }
  };
}
