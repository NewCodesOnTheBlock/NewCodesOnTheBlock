angular.module('events.services', [])

.factory('Events', ($http) => {
  var zipcode = 0;
  let eventList;

  const setZip = (zip) => {
    zipcode = zip;
  };

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
      url: '/events'
    }, function(data) {
      setListData(data);
      return data;
    }, function(error) {
      console.error(error);
    });
  };

  const findZip = (zip) => {
    return $http({
      method: 'POST',
      url: '/zip',
      header: {'content-type': 'application/json'},
      data: {zip:zip}
    });
  };

  const setListData = (data) => {
    console.log('setListData', data);
    eventList = data;
  };

  const getEventList = () => {
    console.log('getEventList', eventList);
    return eventList;
  };

  return {
    setZip:setZip,
    getArtist: getArtist,
    findEvents: findEvents,
    findZip: findZip,
    setListData: setListData,
    getEventList: getEventList
  };

});
