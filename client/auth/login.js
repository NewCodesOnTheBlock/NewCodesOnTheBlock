angular.module('login', [])

.controller('LoginCtrl', ["$scope", function ($scope) {
    $scope.login = () => {
      Login.spotifyLogin();
    };
}]);
