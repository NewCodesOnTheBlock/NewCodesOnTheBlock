angular.module('login', [])

.controller('LoginCtrl', ["$scope", function ($scope) {
  $scope.signIn = function(){
      console.log('inside signIn');
      $http({
        method: 'GET',
        url: '/login'
      }).then(function(resp){
        return resp.data;
      });
    };
}]);
