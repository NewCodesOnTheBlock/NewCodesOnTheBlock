angular.module('events', [
  'events.services',
  'events.list',
  'ngRoute'
])

.config(($routeProvider) => {
  $routeProvider
    .when('/ip', {
      templateUrl: 'index.html',
      controller: 'EventsCtrl'
    })
    .when('/artist', {
      templateUrl: 'events.html',
      controller: 'SongCtrl'
    })
    .otherwise({redirectTo: '/'});
});
