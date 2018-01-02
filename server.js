var http = require('http');
var fs = require('fs');

var server = http.createServer();

server.on('request', function(request, response) {
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    if (request.method === 'GET' && request.url === '/') {
        fs.readFile('./index.html', 'utf-8', function(err, data) {
            if (err) throw err;
            response.write(data);
            response.end();
        });
    } else {
        var imgB64 = '';
        fs.readFile('./img/404.png', function(err, data) {
            if (err) throw err;
            imgB64 = Buffer.from(data).toString('base64');
        });

        fs.readFile('./404.html', 'utf-8', function(err, data) {
            if (err) throw err;
            response.write(data.toString().replace('%fileBase64%', imgB64));
            response.end();
        });
    }
});

server.listen(8080);
console.log('Server running at http://localhost:8080/');