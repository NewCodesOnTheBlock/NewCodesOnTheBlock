angular.module('events.services', [])

.factory('Events', ($http) => {
  const getArtist = (artist) => {
    return $http({
      method: 'POST',
      url: '/artist',
      json: true,
      header: {'content-type': 'application/json'},
      data: JSON.stringify({artist: artist})
    })
    .then((resp) => {
      return resp.data;
    });
  };

  const findEvents = () => {
    return $http({
      method: 'GET',
      url: '/events',
      data: event
    });
  };

  const saveEvent = (event) => {
    return $http({
      method: 'POST',
      url: 'favorite',
      data: event
    });
  };

  return {
    getArtist: getArtist,
    findEvents: findEvents,
    saveEvent: saveEvent
  };

});
