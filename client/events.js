angular.module('events.list', [])

.controller('EventsCtrl', ["$scope", "Events", function($scope, Events) {
  $scope.list = [];
  $scope.findEvents = () => {
    Events.findEvents()
    .then((events) => {
      console.log(events);
      $scope.list.push(events);
      })
      .catch((error) => {
        console.error(error);
    });
  };
  $scope.findEvents();
}]);
