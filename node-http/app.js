var http = require('http');

var server = http.createServer(function(request, response){
    response.end("Funciona!");
});

server.listen(3000);
