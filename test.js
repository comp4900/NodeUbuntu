http = require('http');
http.createServer(function (req, res) {
res.writeHead(200, {'Content-Type': 'text/plain'});
res.end('It is working!\n');
}).listen(3000);
console.log('Server running at port 3000');