/* jshint esversion:6 */
'use strict'
const express = require('express');
const bodyparser = require('body-parser');
const querystring = require('querystring');
const session = require('express-session');
const requestIp = require('request-ip');
const request = require('request');
const db = require('./db.js');
const client_id = require('./credentials.js').client_id;
const client_secret = require('./credentials.js').client_secret;
const seatgeekId = require('./credentials.js').seatgeekId();
const seatgeekSecret = require('./credentials.js').seatgeekSecret();
const youtube_key = require('./credentials.js').youtube_key;
const cookieParser = require('cookie-parser');
const app = express();


db.createTables();
app.set('port', process.env.PORT || 3000);
app.set('ip', process.env.IP || '127.0.0.1');
const URL = process.env.URL || 'http://127.0.0.1:3000';
app.use(cookieParser());
app.use( express.static(__dirname+'/client') );
app.enable('trust proxy');
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);
app.use(bodyparser.json());
app.use(requestIp.mw());

const requestData = function(req, res, url, ip) {
  request(url, function(error,response,body){
    // console.log('BODY', body);
    console.log('URL', url);
    if (error) console.error(error);
    let bodyData = JSON.parse(body);
    let eventsData = {};
    eventsData.meta = {};  //page name for secondary calls
    eventsData.events = [];
    if (!bodyData.status) {
      bodyData.events.forEach(function(event) {
        let concert = {};
        concert.title = event.title;
        concert.venueName = event.venue.name;
        concert.city = event.venue.display_location;
        concert.url = event.url;
        concert.date = event.datetime_local;
        concert.address = event.address;
        concert.artists = [];
        event.performers.forEach(function(performer) {
          concert.artists.push(performer.name);
        });
        eventsData.events.push(concert);
      });

      // if req.cookies.cookieName, query information and send it back with eventData
      console.log('cookie', req.cookies.cookieName);
      if (req.cookies.cookieName){
        db.get(`SELECT * FROM users WHERE id = ${req.cookies.cookieName}`, (err, user) => {
          if (err){
            console.error(err);
          } else {
            console.log('user:', user);
            res.send({'eventsData': eventsData, 'user': user});
          }
        });
      } else {
        res.send({'eventsData': eventsData});
      }
    } else {
      // send error
      // set content-type to json
      res.status(400).send('{error: "error", "msg": "not found"}');
    }
  });
};

app.get('/events', (req, res)=>{
  const clientIp = req.clientIp;
  const url = 'https://api.seatgeek.com/2/events?taxonomies.name=concert&geoip='+clientIp+'&range=30mi&per_page=201&client_id='+seatgeekId+'&client_secret='+seatgeekSecret;
  requestData(req, res, url, clientIp);
});

app.post('/zip', (req, res) => {
  const zip =   req.body.zip;
  const url = 'https://api.seatgeek.com/2/events?taxonomies.name=concert&postal_code='+zip+'&range=30mi&per_page=201&client_id='+seatgeekId+'&client_secret='+seatgeekSecret;
  requestData(req, res, url);
});

app.post('/artist', (req, res)=> {
  //get artist_name and genre from req.body
  //send API call to spotify to ask for artist/genre
  let artist = req.body.artist;
  let genre = ['rock', 'jazz', 'alternative', 'pop', 'raga', 'reggae', 'soul'];
  artist = artist.split(' ').join('+');
  let input = artist;
  let url = `https://api.spotify.com/v1/search?q=${input}&type=artist`;
  //send http request for artist:
  request(url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
    //if artist exist in spotify
      let bodyData = JSON.parse(body);
      if (bodyData.artists.items.length >0) {
        let id = bodyData.artists.items[0].uri;
        let link = `https://embed.spotify.com/?uri=${id}`;
        res.send(link); //send back src for front-end <iframe> tag
      } else { //if artist NOT exist in spotify
        //send http request for genre
        let index = Math.floor(Math.random() * genre.length);
        input = genre[index];
        url = `https://api.spotify.com/v1/search?q=${input}&type=playlist`;
        request(url, (error, response, body) => {
          if (!error && response.statusCode === 200) {
            let bodyData = JSON.parse(body);
            let id = bodyData.playlists.items[0].uri;
            let link = `https://embed.spotify.com/?uri=${id}`;
            res.send(link+"*"); //send back src for front-end <iframe> tag
          }
        });
      }
    }
  });
});

app.post('/map', (req, res)=>{
  let venue = req.body.venue;
  let city = req.body.city;
  let input = venue + "," + city;
  let url = `https://www.google.com/maps?q=[${input}]&output=embed`;
  res.send(url);

});

//login
app.get('/login', (req, res) => {
  console.log('login');
  let scope = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' + querystring.stringify({
    response_type: 'code',
    client_id: client_id(),
    scope: scope,
    redirect_uri: URL + '/callback',
    show_dialog: true
  }));
});

// spotify returns to this endpoint
app.get('/callback', (req, res) => {
  console.log('callback');
  let code = req.query.code || null;
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: URL + '/callback',
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(client_id() + ':' + client_secret()).toString('base64'))
    },
    json: true
  };

  request.post(authOptions, (error, response, body) => {
    if(!error && response.statusCode === 200) {
      let access_token = body.access_token,
        refresh_token = body.refresh_token;
      let options = {
        url: 'https://api.spotify.com/v1/me',
        headers: {
          'Authorization': 'Bearer ' + access_token
        },
        json: true
      };
      request.get(options, (error, response, body) => {
        // console.log('here', body);
        let id = body.id;
        let user_name = body.display_name;
        let user_img = body.images[0].url;

        db.get(`SELECT * FROM users WHERE id = ${id}`, (err, user) => {
          if(err) {
            console.error(err);
          } else if (!user) {
            db.run(`INSERT INTO users (id, user_name, user_img) VALUES ($id, $user_name, $user_img);`, {
              $id: id,
              $user_name: user_name,
              $user_img: user_img
            }, (err) => {
              if (err) {
                console.log('Insert error:', err);
              }
            });
            res.cookie("cookieName", id);
            // res.redirect('/#/events' + querystring.stringify({
            //     access_token: access_token,
            //     refresh_token: refresh_token
            // }));
            res.redirect('/#/events');
          } else {
            res.cookie("cookieName", id);
            // res.redirect('/#' + querystring.stringify({
            //     access_token: access_token,
            //     refresh_token: refresh_token,
            // }));
            res.redirect('/#/events');
          }
        });
      });
    } else {
      res.redirect('/#' + querystring.stringify({
        error: 'invalid_token'
      }));
    }
  });
});


app.get('/refresh_token', (req, res) => {
  console.log('refreshing!');
  let refresh_token = req.query.refresh_token;
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(client_id() + ':' + client_secret()).toString('base64'))
    },
    form: {
      refresh_token: refresh_token,
      grant_type: 'refresh_token'
    },
    json: true
  };
  request.post(authOptions, (error, response, body) => {
    if(!error && response.statusCode === 200) {
      let access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

app.listen(app.get('port'), ()=>{
  console.log('listening on', app.get('port'));
});
