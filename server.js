 var http = require('http')
 var fs = require('fs')
var express = require('express')
var path = require('path')
var exphbs = require('express-handlebars')
var app = express()

app.set('view engine', 'html');
app.use(express.static('public'));


app.set('view engine', 'handlebars');

var port = 3000

app.get('/', function (req, res) {
	res.sendfile('index.html')
})

app.get('*', function (req, res, next) {
    res.status(404).render('404');
});

app.listen(port, function () {
    console.log("Server has begun listening on port " + port);
});