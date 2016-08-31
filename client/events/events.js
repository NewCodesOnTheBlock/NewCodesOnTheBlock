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
