var http = require('http');

var server = http.createServer(function(request, response){

    switch (request.url) {
        case "/":
            response.writeHead(200, {"Content-Type": "text/html"});
            response.end("<h1>Show time!</h1>");
            break;
        case "/about":{
            response.writeHead(200, {"Content-Type": "text/html"});
            response.end("<h1>Mario Costa</h1><br /><h3>@necrower</h3>");
            break;

        } default: {
            response.writeHead(404, {"Content-Type": "text/html"});
            response.end("<h1> :( </h1>");
        }

    }


});

server.listen(3000);
