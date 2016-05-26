GamesNewController.$inject = ["$location", "$http"]; // minification protection
function GamesNewController ($location, $http) {
  var vm = this;
  vm.create = create;
  vm.game = {}; // form data

  ////

  function create() {
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
