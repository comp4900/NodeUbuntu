http = require('http');
http.createServer(function (req, res) {
res.writeHead(200, {'Content-Type': 'text/plain'});
res.end('It is working!\n');
}).listen(80,"70.28.245.73");
console.log('Server running at port 80');