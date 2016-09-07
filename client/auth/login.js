angular.module('login', [])

.controller('LoginCtrl', ["$scope", "Events", "$http", "$state",
  function ($scope, Events, $http, $state) {
    $scope.cleared = function() {Events.clearEvents();};
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
        Events.setZip($scope.zipcode);
        Events.findZip($scope.zipcode)
          .then(function(data) {
            Events.setListData(data.data.events);
            $state.go('events');
          });

      } else {
        alert("Please Enter a valid zipcode");
      }
    };
  }]);
