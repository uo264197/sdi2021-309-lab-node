let http = require('http');
http.createServer(function handler(req, res) {
    setTimeout(function() { // Espera de 10 segundos
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello World\n');
    }, 10000);
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');