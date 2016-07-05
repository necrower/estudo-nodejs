var express = require('express'),
app = express();

app.listen(3000, function(){
  console.log('App is now listening');
});
module.exports = app;
//http://developers.redhat.com/blog/2016/03/15/test-driven-development-for-building-apis-in-node-js-and-express/
