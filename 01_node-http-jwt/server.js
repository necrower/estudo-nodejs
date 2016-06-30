var http = require('http');
var jwt = require('./my-jwt');
//var CryptoJS = require("crypto-js");

//http://www.jonathan-petitcolas.com/2014/11/27/creating-json-web-token-in-javascript.html

var secret = "S3CR3T";

var server = http.createServer(function(request, response){

    if (request.method === 'GET') {
        if(request.url === '/'){
          response.writeHead(200, {"Content-Type" : "textplain"});
          response.end("Hello!!");
        } else if (request.url === '/protected'){
            response.writeHead(403, {"Content-Type" : "textplain"});
            response.end("Not Authorized");
        } else {
            routeNotFound(response);
        }
    } else if(request.method === 'POST'){
        if(request.url === '/login'){
            response.writeHead(200, {"Content-Type" : "textplain"});
            response.end("Hello!!");
        } else {
            routeNotFound(response);
        }
    } else {
        routeNotFound(response);
    }

  //  response.end("WORKING! ");
});

function routeNotFound(response){
    response.writeHead(404, {"Content-Type" : "textplain"});
    response.end("Not Found");
}



//console.log(console.log(CryptoJS.HmacSHA1("Message", "Key")));
//console.log(helpers.createUnsignedToken());
var tk = jwt.createSigned({name: "necrower"}, secret);
//console.log(tk);

console.log(jwt.decode(tk));



server.listen(3000);
