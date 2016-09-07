angular.module('events.list', [])

.controller('EventsCtrl', ["$scope", "Events", function($scope, Events) {
  $scope.list = [];
  
  $scope.cleared = () => {
    Events.clearEvents();
  };

  $scope.checked = false;

  $scope.toggle = () => {
    $scope.checked = !$scope.checked;
  };

  $scope.toggleCheck = () => {
    Events.toggle();
  };

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
  $scope.getEvent = ($index) => {
    let event = $scope.list[$index];
    Events.saveEvent(event);
  };
}]);
