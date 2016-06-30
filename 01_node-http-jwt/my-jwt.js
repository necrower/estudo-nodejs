var CryptoJS = require("crypto-js");
var jwt_decode = require('jwt-decode');


module.exports = {
  base64url : base64url,
  createUnsigned : createUnsigned,
  createSigned : createSigned,
  decode: decode
}


function base64url(source) {
  // Encode in classical base64
  var encodedSource = CryptoJS.enc.Base64.stringify(source);

  // Remove padding equal characters
  encodedSource = encodedSource.replace(/=+$/, '');

  // Replace characters according to base64url specifications
  encodedSource = encodedSource.replace(/\+/g, '-');
  encodedSource = encodedSource.replace(/\//g, '_');

  return encodedSource;
}

 function createUnsigned(data) {
  var header = {
    "alg": "HS256",
    "typ": "JWT"
  };

  var stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
  var encodedHeader = base64url(stringifiedHeader);

  var data = data || {
    "id": 1337,
    "username": "necrower"
  };

  var stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
  var encodedData = base64url(stringifiedData);

  var token = encodedHeader + "." + encodedData;

  return token;
}

function createSigned(data, secret){
  var token = createUnsigned(data);

  var signature = CryptoJS.HmacSHA256(token, secret);
  signature = base64url(signature);

  var signedToken = token + "." + signature;
  return signedToken;
}

function decode(token){
    return jwt_decode(token);
};

/*
Exemplo interessante para manter um contaxto
var helpers = require('./helpers')();
module.exports = function() {
  var ratePoints = 0;
  return {
    rate: function(points) {
      ratePoints = points;
    },
    getPoints: function() {
      return ratePoints;
    }
  }
}
*/
