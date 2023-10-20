var express = require('express');
var app = express();
var fs = require("fs");
// Jovell Christian Q. Miranda.
//BSIT-3A
var song = {
   "song7" : {
      "Title" : "Oksihina ",
      "Lyrics by" : "Dionela",
      "Release Date" : "September 8, 2023",
      "Genre":"Pop",
      "Link":"https://www.youtube.com/watch?v=zRCjgZIua_A",
      "id": 7
    }
}

app.get('/listSongs', function (req, res) {
   fs.readFile( __dirname + "/" + "songs.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})

app.post('/addSong', function (req, res) {
    // First read existing songs.
    fs.readFile( __dirname + "/" + "songs.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data["song7"] = song["song7"];
       console.log( data );
       res.end( JSON.stringify(data));
    });
})

app.get('/:id', function (req, res) {
    // First read existing songs.
    fs.readFile( __dirname + "/" + "songs.json", 'utf8', function (err, data) {
       var songs = JSON.parse( data );
       var song = songs["song" + req.params.id];
       console.log( song );
       res.end( JSON.stringify(song));
    });
})

app.delete('/deleteSong', function (req, res) {
   // First read existing songs.
   fs.readFile( __dirname + "/" + "songs.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      delete data["song2"];
      console.log( data );
      res.end( JSON.stringify(data));
   });
})

app.delete('/deleteSong/:id', function (req, res) {
    // First read existing songs.
    fs.readFile( __dirname + "/" + "songs.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data["song" + req.params.id];
       console.log( data );
       res.end( JSON.stringify(data));
    });
})

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Song app listening at http://%s:%s", host, port);
})