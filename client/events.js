angular.module('events.list', [])

.controller('EventsCtrl', ["$scope", "Events", function($scope, Events) {
  $scope.list = [];
  $scope.findEvents = () => {
    Events.findEvents()
      .then((concert) => {
        const eventList = concert.data.events;
        eventList.forEach(function(event) {
          $scope.list.push(event);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  $scope.findEvents();
}]);
