var current = document.querySelector('#Monday')
var curb = document.querySelector('.dropbtn')
var triceps = document.querySelector('.tricep')
var biceps = document.querySelector('.bicep')
var legs = document.querySelector('.leg')
var should = document.querySelector('.should')
var chests = document.querySelector('.chest')
var backs = document.querySelector('.back')
var ab = document.querySelector('.ab')
var card = document.querySelector('.card')
add = document.getElementsByClassName('exercise-src')
gen = document.getElementsByClassName('generic')

function getImage(URLink, position){
	fetch(URLink)
		.then(res => res.json())
		.then(result => {
			add[position].src = result.firstImage.src
		})
		.catch(err=> console.log(err))
}

window.addEventListener("load", function(){
	userAction()
})

//Calls getImage for each of the different exercise focuses
function userAction() {
	url = "https://limitless-woodland-36659.herokuapp.com/https://wiki-image.herokuapp.com/getFirstImage?WikiUrl=https://en.wikipedia.org/wiki/"
	getImage(url + "Biceps_curl", 0)
	getImage(url + "Triceps", 1)
	getImage(url + "List_of_weight_training_exercises", 2)
	getImage(url + "Pull-down_(exercise)", 3)
	getImage(url + "Dumbbell", 4)
	getImage(url + "Hyperextension_(exercise)", 5)
	getImage(url + "Crunch_(exercise)", 6)
	getImage(url + "Aerobic_exercise", 7)
}

//Changes the Weekday focus
document.querySelectorAll('.focusDay').forEach(item => {
	item.addEventListener('click', function(){
		curb.innerText = item.innerText
		current.classList.remove("focus")
		current = document.getElementById(item.innerText)
		current.classList.add("focus")
	})
})

//handles the selecting and deselecting of exercises
document.querySelectorAll(".exercise").forEach(item => {
	item.addEventListener('click', function (){
		if (item.classList.contains('change')){
			if(item.classList[1] == 'triceps'){
				triceps.appendChild(item)
			}
			else if(item.classList[1] == 'biceps'){
				biceps.appendChild(item)
			}
			else if(item.classList[1] == 'legs'){
				legs.appendChild(item)
			}
			else if(item.classList[1] == 'shoulds'){
				should.appendChild(item)
			}
			else if(item.classList[1] == 'chests'){
				chests.appendChild(item)
			}
			else if(item.classList[1] == 'backs'){
				backs.appendChild(item)
			}
			else if(item.classList[1] == 'abs'){
				ab.appendChild(item)
			}
			else if(item.classList[1] == 'cardio'){
				card.appendChild(item)
			}
		}
		else{
			current.appendChild(item) 
		}
		item.classList.toggle('change')
	})
})

var locContainer = document.getElementById("locations")
var places = {}

//gets the gym location json and prepares it to send
function getLocations(lat, lon){
	fetch("/gyms")
		.then(res => res.json())
		.then(result => {
			
			gymLocations = result
			var length = Object.keys(gymLocations).length
			var locationID = Object.keys(gymLocations)
			var locationBody = ""

			for(var i=0; i<length; i++){
				if(i == 0){
					locationBody += '{"user": [' + lat + ', ' + lon + '],'
					locationBody += '"locations": {"' + locationID[i] +'": [' + gymLocations[locationID[i]].latitude + ', ' + gymLocations[locationID[i]].longitude + '],'
				}
				else if(i == length-1){
					locationBody += '"' + locationID[i] +'": [' + gymLocations[locationID[i]].latitude + ', ' + gymLocations[locationID[i]].longitude + ']}}'
				}
				else{
					locationBody += '"' + locationID[i] +'": [' + gymLocations[locationID[i]].latitude + ', ' + gymLocations[locationID[i]].longitude + '],'
				}
			}
			getLocationOrder(locationBody, gymLocations, length)
		})
}

//sends prepared json to api
function getLocationOrder(locationBody, gymLocations, length){
	fetch("https://findnclosestusers.azurewebsites.net/findNUsers",
		{
			headers: {
				'Accept': "application/json",
				'Content-Type': 'application/json'
			},
			method: "POST",
			body: locationBody
		})
		.then(res => res.json())
		.then(result => {
			gymNames = Object.keys(result)
			for(var i=0; i < length; i++){
				inputLocation(gymLocations, gymNames, result, i)
			}
		})
}

//locations are formated put into html
function inputLocation(gymLocations, gymNames, result, i){
	var link = document.createElement("a")
	var newest = document.createElement("div")
	newest.classList.add("location")
	var name = document.createElement("h4")
	name.innerText = gymNames[i]
	link.appendChild(name)
	var addr = document.createElement("p")
	addr.innerText = "Address: " + gymLocations[gymNames[i]].address
	link.appendChild(addr)
	var dist = document.createElement("p")
	var calculated = result[gymNames[i]] * 10
	dist.innerText = calculated.toFixed(2) + " Miles"
	dist.classList.add("distance")
	link.appendChild(dist)
	link.setAttribute('href', gymLocations[gymNames[i]].website)
	link.setAttribute('target',"_blank")
	newest.appendChild(link)
	locContainer.appendChild(newest)
}

if('geolocation' in navigator){
	navigator.geolocation.getCurrentPosition((position) => {
		getLocations(position.coords.latitude, position.coords.longitude)
	})
}
