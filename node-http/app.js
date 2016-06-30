var http = require('http');
var request = require("request");

//Código single file só pra fazer testes mesmo

var server = http.createServer(function(req, response){
    if (req.method === 'GET') {
        switch (req.url) {
            case "/":
                response.writeHead(200, {"Content-Type": "text/html"});
                response.end("<h1>Show time!</h1>");
                break;
            case "/about":{
                var user = "necrower";
                var options = {
                  url: 'http://api.github.com/users/'+ user,
                  headers: {
                    'User-Agent': 'request'
                  }
                };

                request(options, function(error, resp, body) {
                    //console.log(body);
                    if(resp.statusCode === 200){
                        var parsed = JSON.parse(body);

                        response.writeHead(200, {"Content-Type": "text/html"});
                        response.write("<!DOCTYPE \"html\">");
                        response.write("<html>");
                        response.write("<head>");
                        response.write("<title>" + parsed.login + " PROFILE</title>");
                        response.write("</head>");
                        response.write("<body>");
                        response.write("<h1>"+ parsed.login+ "</h1>");
                        response.write("<img src=\""+ parsed.avatar_url + "\" />");
                        response.write("<h3>" + parsed.location + "</h3>");
                        response.write("</body>");
                        response.write("</html>");
                        response.end();
                    }else {
                        response.writeHead(404, {"Content-Type": "text/html"});
                        response.end("<h1> User not found </h1>");
                    }
                });

                break;
            } default: {
                response.writeHead(404, {"Content-Type": "text/html"});
                response.end("<h1> :( </h1>");
            }
        }
    } else {
        response.writeHead(400, {"Content-Type": "text/html"});
        response.end("Não, obrigado!");
    }


});

server.listen(3000);
