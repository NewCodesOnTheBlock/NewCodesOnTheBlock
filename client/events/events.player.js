angular.module('events.player', [])
.controller('PlayerCtrl', ["$scope", "$stateParams", "$sce","Events", function($scope, $stateParams, $sce,Events) {
  $scope.input = $stateParams.play;
  let input = $scope.input.split('+');
  let artist = input[0];
  let venue = input[1];
  let city = input[2];
  let parentScope = $scope.$parent;
  parentScope.child = $scope;

  Events.getArtist(artist)
  .then((data) => {
    let lastChar = data[data.length - 1];
    $scope.check = lastChar === '*' ? 'N' : 'Y';
    if($scope.check === 'Y'){
      console.log(data,"data in front-end------------");
      $scope.player = $sce.trustAsResourceUrl(data);
    } else {
      let link = data.slice(0, data.length - 1);
      $scope.player = $sce.trustAsResourceUrl(link);
    }
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
