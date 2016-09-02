angular.module('events.list', [])

.controller('EventsCtrl', ["$scope", "Events", function($scope, Events) {
  $scope.list = [];
  $scope.list = Events.getEventList();
  $scope.findEvents = () => {
    Events.findEvents()
      .then((concert) => {
        $scope.list = concert.data.events;
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  if (!$scope.list) {
    $scope.findEvents();
    $scope.list = Events.getEventList();
  }
}]);
