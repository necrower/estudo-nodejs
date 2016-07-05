var http = require('http');

let app = http.createServer((req,res) => {
    res.end("FUNCIONA!")
});


app.listen(3000);
