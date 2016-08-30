/* jshint esversion:6 */
const express = require('express');
const bodyparser = require('body-parser');
const session = require('express-session');
const requestIp = require('request-ip');
const request = require('request');
const app = express();
const port = process.env.PORT || 3000;
const ip = process.env.IP || '127.0.0.1';

app.use( express.static(__dirname+'/client') );
app.enable('trust proxy');
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);

app.use(requestIp.mw());

app.get('/ip', (req, res)=>{
  var clientIp = req.clientIp;
  request('https://api.seatgeek.com/2/events?taxonomies.name=concert&geoip='+clientIp+'&range=12mi', function(error,response,body){
    if (error) console.error(error);
    res.send(body);
  });
});

// app.post('/events',(req,res)=>{
//    //API call to events
//    request('https://api.seatgeek.com/2/performers/266',(request,response)=>{
//          res.send(response);
//    });
// });
app.post('/artist', (req, res)=> {
  //get artist_name and genre from req.body
  //send API call to spotify to ask for artist/genre
  let artist = req.body.artist;
  let genre = req.body.genre;
  artist = artist.split(' ').join('+');
  let input = artist;
  let url = `https://api.spotify.com/v1/search?q=${input}&type=artist`;    
  //send http request for artist: 
  request(url, (error, response, body) => {
    //if artist exist in spotify
    if (!error && response.statusCode === 200) {
      body = JSON.parse(body);
      if (body.artists.items.length > 1) {
        let id = body.artists.uri;
        let link = `https://embed.spotify.com/?uri=${id}`;
        res.send(link); //send back src for front-end <iframe> tag
      } else { //if artist NOT exist in spotify
        //send http request for genre
        let input = genre;
        request(url, (error, response, body) => {
          if (!error && response.statusCode === 200) {
            body = JSON.parse(body);
            let id = body.artists.uri;
            let link = `https://embed.spotify.com/?uri=${id}`;
            res.send(link); //send back src for front-end <iframe> tag
          }
        });
      }
    }
  });
});
app.get('/book',(req,res)=>{
    //get artist/event info from req.body
    //API call to seatgeek for specific event url
    //redirect to specific url
    res.redirect('https://seatgeek.com/');//for simplicity, redirect to seatgeek for now
});



app.set('port', port);

app.listen(app.get('port'), ()=>{
  console.log('listening on', port);
});
