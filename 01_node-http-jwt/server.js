var http = require('http');
var jwt = require('jsonwebtoken');

//http://www.jonathan-petitcolas.com/2014/11/27/creating-json-web-token-in-javascript.html
// {"login":"necrower","pass":"123456" }
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibG9naW4iOiJuZWNyb3dlciIsImlhdCI6MTQ2NzMyMTYyN30.z-OjESWwZRGCKEsPfehNoLPS63ygxZjpVaesGVarZLk

var secret = "S3CR3T";

var server = http.createServer(function(request, response) {

  var type = "text/plain";

  if (request.method === 'GET') {
    if (request.url === '/') {
      response.writeHead(200, {
        "Content-Type": type
      });
      response.end("Hello!!");

    } else if (request.url === '/protected') {
        var token = request.headers.authorization;

        try {
            var decoded = jwt.verify(token, secret);
            response.writeHead(200, { "Content-Type": type });
            response.end(JSON.stringify(decoded));
        } catch(err) {
            routeProtected(response);
        }

    } else {
      routeNotFound(response);
    }
  } else if (request.method === 'POST') {
    if (request.url === '/login') {
        var body = '';
        request.on('data', function(data) {
          body += data;
        });
        request.on('end', function() {
            var params = JSON.parse(body);

            var credencials = {
                login: params.login,
                password: params.pass
            };

            //simulando o retorno do usuário
            var user = {
                id : 1,
                login : credencials.login
            }

            var ret = '';
            if(user && user.login && user.login === 'necrower')
                 ret = JSON.stringify({ "token" : jwt.sign(user, secret)})

            response.writeHead(200, { "Content-Type": "application/json" });
            response.end(ret);

        });





    } else {
      routeNotFound(response);
    }
  } else {
    routeNotFound(response);
  }

  //  response.end("WORKING! ");
});

function routeNotFound(response) {
  response.writeHead(404, {
    "Content-Type": "textplain"
  });
  response.end("Not Found");
}

function routeProtected(response) {
  response.writeHead(403, {
    "Content-Type": "textplain"
  });
  response.end("Not Authorized");
}

server.listen(3000);
