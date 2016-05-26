GamesIndexController.$inject = ["$http"]; // minification protection
function GamesIndexController ($http) {
  var vm = this;
  vm.games = [];

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
