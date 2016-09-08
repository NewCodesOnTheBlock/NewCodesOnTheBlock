angular.module('login', [])

.controller('LoginCtrl', ["$scope", "Events", "$http", "$state",
  function ($scope, Events, $http, $state) {
    $scope.cleared = () => {
      Events.clearEvents();
    };

    $scope.signIn = function(){
      $http({
        method: 'GET',
        url: '/login'
      }).then(function(resp){
        return resp.data;
      });
    };

    $scope.postalSearch = function() {
      if ($scope.zipcode && $scope.zipcode.length > 4) {
        console.log("inside zippp");
        Events.setZip($scope.zipcode);
        Events.findZip($scope.zipcode)
          .then(function(data) {
            Events.setListData(data.data.eventsData.events);
            $state.go('events').then(function(){
              Events.showUser();
            });
          });

      } else {
        alert("Please Enter a valid zipcode");
      }
    };
  }]);
