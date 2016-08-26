angular.module('events.list', [])

.controller('EventsCtrl', [$scope, ($scope, Events) => {
  $scope.list = [];
  $scope.findEvents = () => {
    Events.findEvents()
    .then((events) => {
      $scope.list.push({})
      })
      .catch((error) => {
        console.error(error);
    });
  };
  $scope.findEvents();
}]);
