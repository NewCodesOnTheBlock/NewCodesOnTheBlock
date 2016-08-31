angular.module('events', [
  'events.services',
  'events.list',
  'events.player',
  'login',
  'ui.router' //ngroute no longer needed. ui.router will handle all states and routes
])

.config(['$urlRouterProvider', '$stateProvider', ($urlRouterProvider, $stateProvider) => {
  //In ur.router, urlRouterProvider is equivalent to ngroute $routeProvider
  $urlRouterProvider.otherwise('/');

  // States allow us to show specific views within the same html page.
  $stateProvider
    .state('events', {
      url: '/events',
      templateUrl: 'events/events.html',
      controller: 'EventsCtrl'
    })
    .state('login', {
      url: '/',
      templateUrl: 'auth/login.html',
      controller: 'LoginCtrl'
    })
    // This is a child state to the "events" state. Still needs work but ideally we can have this show the player without altering our main url.
    .state('events.play', {
      url:'/:play',
      templateUrl: 'events/events.player.html',
      controller: 'PlayerCtrl'
    });
}]);

// .when('/ip', {
//   templateUrl: 'index.html',
//   controller: 'EventsCtrl'
// })
// .when('/artist', {
//   templateUrl: 'events.html',
//   controller: 'SongCtrl'
// })
