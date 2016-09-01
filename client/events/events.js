angular.module('events.list', [])

.controller('EventsCtrl', ["$scope", "Events", function($scope, Events) {
  $scope.list = [];

  $scope.list = Events.getEventList();


  $scope.findEvents = () => {
    Events.findEvents()
      .then((concert) => {
        // const eventList = concert.data.events;
        // eventList.forEach(function(event) {
        //   $scope.list.push(event);
        // });

        console.log('concert: ', concert);
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

  console.log('$scope.list: ', $scope.list);

  // $scope.findZip = () => {
  //   Events.findZip($scope.zipcode)
  //     .then((concert) => {
  //       const eventList = concert.data.events;
  //       eventList.forEach(function(event) {
  //         $scope.list.push(event);
  //       });
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };
  // if(Events.)
    // $scope.findEvents();

}]);
