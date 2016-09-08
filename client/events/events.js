angular.module('events.list', [])

.controller('EventsCtrl', ["$scope", "Events", function($scope, Events) {
  $scope.list = [];
  $scope.child = {};
  $scope.user = null;
  $scope.cleared = () => {
    Events.clearEvents();
  };

  $scope.checked = false;

  $scope.toggle = () => {
    $scope.checked = !$scope.checked;
  };

  $scope.toggleCheck = (curr) => {
    if(document.getElementById("sidebarToggle").checked===false){
      Events.toggleOn();
    } else if (document.getElementById("sidebarToggle").checked===true) {
      console.log("GetArtist:", curr);
      console.log("CLICKED", $scope.child.input.split('+')[0]);
      if(curr === $scope.child.input.split('+')[0]){
        Events.toggleOff();
      }
    }
  };

  $scope.showUser = () => {
    Events.showUser();
  };


  $scope.list = Events.getEventList();
  $scope.findEvents = () => {
    Events.findEvents()
      .then((concert) => {
        $scope.list = concert.data.eventsData.events;
        Events.setListData(concert.data.eventsData.events);
        $scope.user = concert.data.user;
        Events.setUser(concert.data.user);
        $scope.showUser();
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
