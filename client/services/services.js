angular.module('events.services', [])

.factory('Events', ($http) => {
  var zipcode = 0;
  let eventList;
  let user = null;

  const clearEvents = () => {
    eventList = undefined;
  };

  const toggleOn = () => {
    document.getElementById("sidebarToggle").checked = true;
  };

  const toggleOff = () => {
    document.getElementById("sidebarToggle").checked = false;
  };

  const showUser = ()=>{
    let el = document.getElementById("login");
    if (user !== null && user !== undefined){
      let userDisplay = document.createTextNode("Logged in as " + user.user_name + " ");
      let profile = document.createElement("H5");
      let image = document.createElement("img");
      image.src = user.user_img;
      profile.appendChild(userDisplay);
      profile.appendChild(image);
      // el.replaceChild(profile, el.childNodes[1]);
      el.appendChild(profile);
    } else {
      let ref = document.createElement("a");
      console.log(ref);
      ref.href = "/login";
      let button = document.createElement("button");
      var buttonText = document.createTextNode("Sign In with Spotify");
      button.appendChild(buttonText);
      ref.appendChild(button);
      el.appendChild(ref);
    }
  };

  const setUser = (data) => {
    user = data;
  };

  const getUser = () =>{
    return user;
  };

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

  const getMap = (venue, city) => {
    return $http({
      method: 'POST',
      url: '/map',
      json: true,
      header: {'content-type': 'application/json'},
      data: JSON.stringify({venue: venue, city: city})
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
      setListData(data.data.eventsData);
      setUser(data.data.user);
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
    eventList = data;
  };

  const getEventList = () => {
    return eventList;
  };
  const saveEvent = (event) => {
    return $http({
      method: 'POST',
      url: 'favorite',
      data: event
    });
  };

  return {
    clearEvents:clearEvents,
    setZip:setZip,
    getArtist: getArtist,
    findEvents: findEvents,
    findZip: findZip,
    setListData: setListData,
    getEventList: getEventList,
    saveEvent: saveEvent,
    toggleOn: toggleOn,
    toggleOff: toggleOff,
    getMap: getMap,
    setUser: setUser,
    showUser: showUser,
    getUser: getUser
  };

});
