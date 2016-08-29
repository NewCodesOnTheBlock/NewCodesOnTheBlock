/* jshint esversion:6 */
const express = require('express');
const bodyparser = require('body-parser');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 3000;
const ip = process.env.IP || '127.0.0.1';
const request = require('request');
app.use( express.static(__dirname+'/client') );

// app.enable('trust proxy'); //
// app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);

console.log("fsdfjkhdks");
app.get('/ip', (req, res)=>{
  console.log((req.connection.remoteAddress));
  res.send(req.connection.remoteAddress);
});

// app.post('/events',(req,res)=>{
//    //API call to events
//    request('https://api.seatgeek.com/2/performers/266',(request,response)=>{
//          res.send(response);
//    });
// });
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
