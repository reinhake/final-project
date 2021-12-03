var http = require('http')
var express = require('express')
var exphbs = require('express-handlebars')
var app = express()
var gymArray = require('./public/gyms.json')


app.set('view engine', 'html');
app.use(express.static('public'));
app.use(express.json())

var port = 8080

app.get('/', function (req, res) {
	res.sendfile('index.html')
})

app.get('/gyms', function (req, res) {
	res.contentType("application/json")
	res.status(200).send(gymArray)
})

app.get('*', function (req, res, next) {
    res.status(404).render('404');
});

app.listen(port, function () {
    console.log("Server has begun listening on port " + port);
});