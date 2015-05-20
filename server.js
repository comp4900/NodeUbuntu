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
    fs.writeFile(__dirname + '/push/bracket_1_juniors.html', req.body.html, function(err) {
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
// Reads report files in "push" folder, generates html code to display them
app.get('/reports', function(req, res){

    console.log('start reports ' + __dirname + '/push');

    files = fs.readdirSync( __dirname + '/push'); 
	var bracket = [];
	var qualification = [];
	var situation = [];
	var b = q = s = reports = 0;
	for(var i = 0; i < files.length; i++)
	{ 	
		if(files[i].indexOf(".html") > -1)
		{	reports = 1;
			if(files[i].indexOf("bracket") == 0)
			{
				bracket[b++] = files[i];
			}
			if(files[i].indexOf("qualification") == 0)
			{
				qualification[q++] = files[i];
			}
			if(files[i].indexOf("situation") == 0)
			{
				situation[s++] = files[i];
			}
		}
	}
	String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
	};
    res.writeHead(200, { 'Content-Type': 'text/html' });
    var html = '<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Reports</title></head><body>';   
   
   if(reports != 0)
   {
		html += '<h3>Reports available to select for real-time updates</h3><br>\n';
   }
   else
   {
		html += '<h3>There are no real-time reports available at this time, try again later</h3><br>\n';
   }
	if(bracket.length > 0){
		html += '<h5>Bracket:</h5>'
		html +='<ul>\n';
		for (var i=0; i < bracket.length; i++) {		
			html += '<li><a href="http://localhost/push/' + bracket[i] + '">' 
			+ (bracket[i].substring(0,bracket[i].indexOf("."))).replace(/[0-9]|_/g,' ').capitalize()+'</a></li>\n';	
		}
		html +='</ul>';
	}
	if(qualification.length > 0){
		html += '<h5>Qualification:</h5>'
		html +='<ul>\n';
		for (var i=0; i < qualification.length; i++) {		
			html += '<li><a href="http://localhost/push/' + qualification[i] + '">'
			+ (qualification[i].substring(0,qualification[i].indexOf("."))).replace(/[0-9]|_/g,' ').capitalize()+'</a></li>\n';	
		}
		html +='</ul>';
	}
	if(situation.length > 0){
		html += '<h5>Situation:</h5>'
		html +='<ul>\n';
		 for (var i=0; i < situation.length; i++) {		
			html += '<li><a href="http://localhost/push/' + situation[i] + '">'
			+ (situation[i].substring(0,situation[i].indexOf("."))).replace(/[0-9]|_/g,' ').capitalize() + '</a></li>\n';	
		}
		html +='</ul>';
	}
    html += '</body></html>';
    res.end(html, 'utf-8');

    console.log('end reports');
});

http.listen(80); //start listening on port 80

console.log('listening on *:80');

