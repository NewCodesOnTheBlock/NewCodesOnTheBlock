angular.module('events.services', [])

.factory('Events', ($http) => {
  const getArtist = () => {
    return $http({
      method: 'GET',
      url: '/artist'
    })
    .then((resp) => {
      return resp.data;
    });
  };

  const findEvents = () => {
    return $http({
      method: 'POST',
      url: '/events',
      data: event
    });
  };

  return {
    getEvents: getEvents,
    findEvents: findEvents
  };

});
