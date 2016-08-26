angular.module('events', [
  'events.services',
  'events.list',
  'ngRoute'
])

.config(($routeProvider) => {
  $routeProvider
    .when('/events', {
      templateUrl: 'events.html',
      controller: 'EventsCtrl'
    })
    .when('/artist', {
      templateUrl: 'events.html',
      controller: 'SongCtrl'
    })
    .otherwise({redirectTo: '/'});
});
