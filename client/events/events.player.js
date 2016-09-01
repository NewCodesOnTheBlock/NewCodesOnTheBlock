angular.module('events.player', [])
.controller('PlayerCtrl', ["$scope", "$stateParams", "$sce","Events", function($scope, $stateParams, $sce,Events) {
  $scope.player = $stateParams.play;
  let artist = $scope.player;
  Events.getArtist(artist)
  .then((data) => {
    $scope.data = $sce.trustAsResourceUrl(data);
  })
  .catch((error) =>{
    console.log(error);
  });

}]);
