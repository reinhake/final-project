

var current = document.querySelector('.mon')
var curb = document.querySelector('.dropbtn')
var triceps = document.querySelector('.tricep')
var biceps = document.querySelector('.bicep')
var legs = document.querySelector('.leg')
var should = document.querySelector('.should')
var chests = document.querySelector('.chest')
var backs = document.querySelector('.back')
var ab = document.querySelector('.ab')
var card = document.querySelector('.card')




function userAction() {
	url = "https://limitless-woodland-36659.herokuapp.com/https://wiki-image.herokuapp.com/getFirstImage?WikiUrl=https://en.wikipedia.org/wiki/"
	bicep = url + "Biceps_curl"
	tricep = url + "Triceps"
	leg = url + "List_of_weight_training_exercises"
	shoulder = url + "Pull-down_(exercise)"
	chest = url + "Dumbbell"
	back = url + "Hyperextension_(exercise)"
	abs = url + "Crunch_(exercise)"
	cardio = url + "Aerobic_exercise"
	add = document.getElementsByClassName('exercise-src')
	gen = document.getElementsByClassName('generic')
	
	fetch(bicep)
		.then(res => res.json())
		.then(result => {
			add[0].src = result.firstImage.src
		})
		.catch(err=>console.log(err))
	fetch(tricep)
		.then(res => res.json())
		.then(result => {
			add[1].src = result.firstImage.src
		})
		.catch(err=>console.log(err))
	fetch(leg)
		.then(res => res.json())
		.then(result => {
			add[2].src = result.firstImage.src
		})
		.catch(err=>console.log(err))
	fetch(shoulder)
		.then(res => res.json())
		.then(result => {
			add[3].src = result.firstImage.src
		})
		.catch(err=>console.log(err))
	fetch(chest)
		.then(res => res.json())
		.then(result => {
			add[4].src = result.firstImage.src
		})
		.catch(err=>console.log(err))
	fetch(back)
		.then(res => res.json())
		.then(result => {
			add[5].src = result.firstImage.src
		})
		.catch(err=>console.log(err))
	fetch(abs)
		.then(res => res.json())
		.then(result => {
			add[6].src = result.firstImage.src
		})
		.catch(err=>console.log(err))
	fetch(cardio)
		.then(res => res.json())
		.then(result => {
			add[7].src = result.firstImage.src
		})
		.catch(err=>console.log(err))
}


var mon = document.querySelector('.Monday')
mon.addEventListener("click", function () {
	curb.innerText = "Monday"
	current.classList.remove("focus")
	current = document.querySelector(".mon")
	current.classList.add("focus")
})

var tue = document.querySelector('.Tuesday')
tue.addEventListener("click", function () {
	curb.innerText = "Tuesday"
	current.classList.remove("focus")
	current = document.querySelector(".tue")
	current.classList.add("focus")
})

var wed = document.querySelector('.Wednesday')
wed.addEventListener("click", function () {
	curb.innerText = "Wednesday"
	current.classList.remove("focus")
	current = document.querySelector(".wed")
	current.classList.add("focus")
})

var thu = document.querySelector('.Thursday')
thu.addEventListener("click", function () {
	curb.innerText = "Thursday"
	current.classList.remove("focus")
	current = document.querySelector(".thu")
	current.classList.add("focus")
})

var fri = document.querySelector('.Friday')
fri.addEventListener("click", function () {
	curb.innerText = "Friday"
	current.classList.remove("focus")
	current = document.querySelector(".fri")
	current.classList.add("focus")
})

var sat = document.querySelector('.Saturday')
sat.addEventListener("click", function () {
	curb.innerText = "Saturday"
	current.classList.remove("focus")
	current = document.querySelector(".sat")
	current.classList.add("focus")
})

var sun = document.querySelector('.Sunday')
sun.addEventListener("click", function () {
	curb.innerText = "Sunday"
	current.classList.remove("focus")
	current = document.querySelector(".sun")
	current.classList.add("focus")
})



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

window.addEventListener("load", function(){
	userAction()
})

var locContainer = document.getElementById("locations")
var places = {}

function getLocations(lat, lon){
	var gyms = 
	fetch("/gyms")
		.then(res => res.json())
		.then(result => {
			
			gyms = result
			var len = Object.keys(gyms).length
			var loc = Object.keys(gyms)
			var finals = ""

			for(var i=0; i<len; i++){
				if(i == 0){
					finals += '{"user": [' + lat + ', ' + lon + '],'
					finals += '"locations": {"' + loc[i] +'": [' + gyms[loc[i]].latitude + ', ' + gyms[loc[i]].longitude + '],'
				}
				else if(i == len-1){
					finals += '"' + loc[i] +'": [' + gyms[loc[i]].latitude + ', ' + gyms[loc[i]].longitude + ']}}'
				}
				else{
					finals += '"' + loc[i] +'": [' + gyms[loc[i]].latitude + ', ' + gyms[loc[i]].longitude + '],'
				}
			}
			
			
			fetch("https://findnclosestusers.azurewebsites.net/findNUsers",
			{
				headers: {
					'Accept': "application/json",
					'Content-Type': 'application/json'
				},
				method: "POST",
				body: finals
			})
			.then(res => res.json())
			.then(result => {
					console.log(result)
					names = Object.keys(result)
					for(var i=0; i < len; i++){
						var link = document.createElement("a")
						var newest = document.createElement("div")
						newest.classList.add("location")
						var name = document.createElement("h4")
						name.innerText = names[i]
						link.appendChild(name)
						var addr = document.createElement("p")
						addr.innerText = "Address: " + gyms[names[i]].address
						link.appendChild(addr)
						var dist = document.createElement("p")
						var calculated = result[names[i]] * 10
						dist.innerText = calculated.toFixed(2) + " Miles"
						dist.classList.add("distance")
						link.appendChild(dist)
						
						link.setAttribute('href',gyms[names[i]].website)
						link.setAttribute('target',"_blank")
						newest.appendChild(link)
						locContainer.appendChild(newest)
					}
				})
	})
	
	

}

if('geolocation' in navigator){
	navigator.geolocation.getCurrentPosition((position) => {
		getLocations(position.coords.latitude, position.coords.longitude)
	})
}
