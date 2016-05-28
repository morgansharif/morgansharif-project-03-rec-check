GamesIndexController.$inject = ["$http"]; // minification protection
function GamesIndexController ($http) {
  var vm = this;
  vm.games = [];

  // set default map position over bay area
  vm.map = { center: { latitude: 37.78, longitude: -122.44 }, zoom: 8 };

  query(); // fetch all the games (index)

  ////

  function query() {
    $http
      .get('/api/games')
      .then(function onSuccess(response) {
        vm.games = response.data;
      });
  }
}
