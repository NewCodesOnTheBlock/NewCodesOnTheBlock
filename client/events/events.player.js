angular.module('events.player', [])
.controller('PlayerCtrl', ["$scope", "$stateParams", "$sce","Events", function($scope, $stateParams, $sce,Events) {
  $scope.player = $stateParams.play;
  let artist = $scope.player;
  //console.log(artist,"artist")
  Events.getArtist(artist)
  .then((data) => {
    $scope.data = $sce.trustAsResourceUrl(data);
  })
  .catch((error) =>{
    console.log(error);
  });
  
}]);
