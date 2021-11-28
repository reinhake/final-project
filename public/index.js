var current = document.querySelector('.mon')
var triceps = document.querySelector('.tricep')
var biceps = document.querySelector('.bicep')
var legs = document.querySelector('.leg')



function getGyms () {
	var req = new XMLHttpRequest();
	var reqURL = "/gyms";
	req.open('GET', reqURL);
	req.addEventListener('load', function (eventt) {
		if (eventt.target.status == 200){
			res = req.responseText
			console.log(req.response)
			return JSON.parse(res)
		}
	})
}

function userAction() {
	url = "https://limitless-woodland-36659.herokuapp.com/https://wiki-image.herokuapp.com/getFirstImage?WikiUrl=https://en.wikipedia.org/wiki/"
	bicep = url + "Biceps_curl"
	tricep = url + "Triceps"
	leg = url + "List_of_weight_training_exercises"
	exercise = url + "Exercise"
	add = document.getElementsByClassName('exercise-src')
	gen = document.getElementsByClassName('generic')
	
	fetch(bicep)
		.then(res => res.json())
		.then(result => {
//			console.log(result)
			add[0].src = result.firstImage.src
		})
		.catch(err=>console.log(err))
	fetch(tricep)
		.then(res => res.json())
		.then(result => {
//			console.log(result)
			add[1].src = result.firstImage.src
		})
		.catch(err=>console.log(err))
	fetch(leg)
		.then(res => res.json())
		.then(result => {
//			console.log(result)
			add[2].src = result.firstImage.src
		})
		.catch(err=>console.log(err))
	fetch(exercise)
		.then(res => res.json())
		.then(result => {
//			console.log(result)
			gen[0].src = result.firstImage.src
		})
		.catch(err=>console.log(err))
}

var selector = document.querySelector('#day')

selector.addEventListener("click", function () {
	if(selector.selectedIndex == 0){
		current = document.querySelector(".mon")
	}
	else if(selector.selectedIndex == 1){
		current = document.querySelector(".tue")
	}
	else if(selector.selectedIndex == 2){
		current = document.querySelector(".wed")
	}
	else if(selector.selectedIndex == 3){
		current = document.querySelector(".thu")
	}
	else if(selector.selectedIndex == 4){
		current = document.querySelector(".fri")
	}
	else if(selector.selectedIndex == 5){
		current = document.querySelector(".sat")
	}
	else if(selector.selectedIndex == 6){
		current = document.querySelector(".sun")
	}

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
		}
		else{
			current.appendChild(item) 
		}
		item.classList.toggle('change')
	})
})

/*
var dotw = document.querySelector('.day-exercise')
 {
	if(selector.selectedIndex == 0){
		dotw.innerText = "Monday"
	}
	else if(selector.selectedIndex == 1){
		dotw.innerText = "Tuesday"
	}
	else if(selector.selectedIndex == 2){
		dotw.innerText = "Wednesday"
	}
	else if(selector.selectedIndex == 3){
		dotw.innerText = "Thursday"
	}
	else if(selector.selectedIndex == 4){
		dotw.innerText = "Friday"
	}
	else if(selector.selectedIndex == 5){
		dotw.innerText = "Saturday"
	}
	else if(selector.selectedIndex == 6){
		dotw.innerText = "Sunday"
	}
})*/

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
			
			
			fetch("/findNUsers",
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
