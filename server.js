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
  let clientIp = req.clientIp;
  request('https://api.seatgeek.com/2/events?taxonomies.name=concert&geoip='+clientIp+'&range=30mi&per_page=25', function(error,response,body){
    if (error) console.error(error);
  // console.log('thissssss',JSON.parse(response.body.events[0].title));
  let bodyData = JSON.parse(body);
  console.log(typeof bodyData);
  let eventsData = {};
  eventsData.meta = {};  //page name for secondary calls
  eventsData.events = [];
  bodyData.events.forEach(function(event) {
    let concert = {};
    concert.title = event.title;
    concert.venueName = event.venue.name;
    concert.city = event.venue.display_location;
    concert.url = event.url;
    eventsData.events.push(concert);
  });
  console.log(eventsData);
    res.send(JSON.stringify(eventsData));
  });
});

app.get('/artist',(req,res)=>{
	//get artist info from req.body
	//API call to spotify to get artist playlist id
	//send back src for front-end <iframe> tag
    res.send('https://embed.spotify.com/?uri=spotify:user:spotify:playlist:1yHZ5C3penaxRdWR7LRIOb'); //playlist ID: 6rqhFgbbKwnb9MLmUQDhG6
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
