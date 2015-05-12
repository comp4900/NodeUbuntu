var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var multer = require('multer'); 
var fs = require('fs');

app.use(bodyParser.json()); // for parsing application/json
app.use(express.static(__dirname + '/')); // for using static css, js files, etc.

// Runs when receiving a GET (i.e. from browser)
app.get('/', function(req, res){

  //send the index.html file for all requests
  res.sendFile(__dirname + '/index.html');

});

// Runs when a POST is received at:  [base url]/bracket/html/
app.post('/bracket/html/', function(req, res) {

    // overwrite index.html with text from received json
    fs.writeFile('index.html', req.body.html, function(err) {
        if(err) return console.log(err);
    });
    res.send(""); // send empty string for response

});

// Runs when a POST is received at: [base url]/bracket/update/
app.post('/bracket/update/', function(req, res) {

    // send a named push event to any listeners
    // name: 'update'
    // content: whatever was in the received json with name = 'update'
    // This will get received by the index.html javascript
    io.emit('update', req.body.update);
    res.send("");

});

http.listen(80); //start listening on port 80

console.log('listening on *:80');

