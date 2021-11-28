 var http = require('http')
 var fs = require('fs')
var express = require('express')
var path = require('path')
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

app.get('/planner', function (req, res) {
	res.sendfile('index.html')
})

app.get('/Calendar', function (req, res) {
	res.sendfile('public/Calendar.html')
})

app.get('/Map', function (req, res) {
	res.sendfile('index.html')
})

app.get('/gyms', function (req, res) {
	res.contentType("application/json")
	res.status(200).send(gymArray)
})

app.post('/findNUsers', async (req, res) =>{
	//req.body should include a json with parameters user and locations
	//user should containt a pair of coordinates
	//locations should contain an array of pairs of coordinates
	//returns an array of coordinates in the order of closest to farthes from the user
	
	doc = req.body

	//user location
	user = doc.user
	
	//array of key: location pairs
	locations = doc.locations
	
	//len is number of locations not including the user
	len = Object.keys(locations).length

	//loca is the list of key names
	loca = Object.keys(locations)

	let array = []
	
	//calculate distance of each location to the user and store them in array
	for(i=0; i < len; i++){
		let loc = locations[loca[i]]
		
		let distx = user[0] - loc[0]
		let disty = user[1] - loc[1]
		let dist = Math.sqrt((distx * distx) + (disty * disty))
		array.push(dist)
	}
	
	var finall = ''
	
	
	//sort the distances in array and put into finall in the syntax of a JSON
	for(j = 0; j < len; j++){
		min = 1000000
		mini = -1
		for( i = 0; i < array.length; i++){
			if(array[i] < min){
				min = array[i]
				mini = i
			}
		}
		console.log(mini)
		if(j == 0){
			finall += '{"' + loca[mini] + '": [' + array[mini] + '], '
		}
		else if (j == len - 1){
			finall += '"' + loca[mini] + '": [' + array[mini] + ']}'
		}
		else{
			finall += '"' + loca[mini] + '": [' + array[mini] + '], '
		}
		array[mini] = 1000000
		
	}
	
	//send final array
	res.header("Content-Type",'application/json')
	res.status(200).send(finall)
	
})

app.get('*', function (req, res, next) {
    res.status(404).render('404');
});

app.listen(port, function () {
    console.log("Server has begun listening on port " + port);
});