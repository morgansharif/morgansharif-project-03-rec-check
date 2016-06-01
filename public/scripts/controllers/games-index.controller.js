GamesIndexController.$inject = ["$http"]; // minification protection
function GamesIndexController ($http) {
  var vm = this;
  vm.games = [];
  vm.filterDate = Date.now();
  vm.dateList = [];
  // set default map position over bay area
  vm.map = { center: { latitude: 37.78, longitude: -122.44 }, zoom: 8 };
  query(); // fetch all the games (index)

  next_30_days();

  // builds array of start/end times for the next 30 days to be used for filter
  function next_30_days(){
    var today = new Date();
    var tempArr = [];
    // console.log("TODAY: " + today);
    var year = today.getFullYear();
    var month = today.getMonth();
    var date = today.getDate();
    for(var i=0; i<30; i++){
          var this_day= new Date(year, month, date + i);
          var day_end = new Date(year, month, date + i, 23, 59, 59, 999);
          tempArr.push([this_day, day_end]);
          // console.log("___day "+ (i + 1) +"___");
          // console.log("<0> " + this_day);
          // console.log("<1> " + day_end);
    }
    vm.dateList = tempArr;
    vm.filterDate= tempArr[0];
  }

  ////

  function query() {
    $http
      .get('/api/games')
      .then(function onSuccess(response) {
        vm.games = response.data;
      });
  }
}
