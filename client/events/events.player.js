angular.module('events.player', [])
.controller('PlayerCtrl', ["$scope", "$stateParams", "$sce","Events", function($scope, $stateParams, $sce,Events) {
  $scope.input = $stateParams.play;
  let input = $scope.input.split('+');
  let artist = input[0];
  let venue = input[1];
  let city = input[2];
  console.log(artist,"-----", venue, "------", city);
  //console.log(artist,"artist-------------");
  Events.getArtist(artist)
  .then((data) => {
    $scope.player = $sce.trustAsResourceUrl(data);
  })
  .catch((error) =>{
    console.log(error);
  });
  Events.getMap(venue, city)
  .then((data) => {
    $scope.map = $sce.trustAsResourceUrl(data);
  })
  .catch((error) =>{
    console.log(error);
  });

}]);
