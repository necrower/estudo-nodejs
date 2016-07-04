var express = require('express');
var app = express();

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.use(express.static('public'));

app.get("/", function(req, res){
    res.render("index.html");
});


app.listen(3000, function(){
    console.log("Running: 3000!");
})
