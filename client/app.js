angular.module('events', [
  'events.services',
  'events.list',
  'events.player',
  'login',
  'ui.router' //ngroute no longer needed. ui.router will handle all states and routes
])

.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', ($urlRouterProvider, $stateProvider, $locationProvider) => {
  //In ui.router, $stateProvider is similart to ngroute $routeProvider but can also render additional nested views.
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(false);
  $locationProvider.hashPrefix('');
  // States allow us to show specific views within the same html page.
  $stateProvider
    .state('login', {
      url: '/',
      templateUrl: 'auth/login.html',
      controller: 'LoginCtrl'
    })
    .state('events', {
      url: '/events',
      templateUrl: 'events/events.html',
      controller: 'EventsCtrl'
    })
    // This is a child state to the "events" state.
    .state('events.play', {
      url:'/play/:play',
      templateUrl: 'events/events.player.html',
      controller: 'PlayerCtrl'
    });

}]);
