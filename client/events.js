angular.module('events.list', [])

.controller('EventsCtrl', ["$scope", "Events", function($scope, Events) {
  $scope.list = [];
  $scope.findEvents = () => {
    Events.findEvents()
    .then((events) => {
      console.log(events.data.events);
      const eventList = events.data.events;
      eventList.forEach(function(event){
        $scope.list.push(event);
      });
      })
      .catch((error) => {
        console.error(error);
    });
  };
  $scope.findEvents();
}]);
