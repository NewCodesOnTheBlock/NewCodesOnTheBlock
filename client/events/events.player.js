angular.module('events.player', [])
.controller('PlayerCtrl', ["$scope", "$stateParams", "Events", function($scope, $stateParams, Events) {
  $scope.events = $stateParams.events;
}]);
