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
  $scope.getEvent = ($index) => {
    let event = $scope.list[$index];
    console.log(event, "event from front-end");
    Events.saveEvent(event);
  };

  // $scope.getArtist = () => {
  //   Events.getArtist(artist)
  //  .then((data) => {
  //  //console.log(data, 'data from events.js');
  //  //   let myEl = angular.element( document.querySelector( '#player' ) );
  //  //   myEl.html('<iframe src = ' + data + ' width="300" height="380" frameborder="0" allowtransparency="true"></iframe>');
  //  console.log(data);
  //  $scope.data = data;
  //  })
  //  .catch((error) => {
  //    console.error(error);
  //  });
  //};


}]);
