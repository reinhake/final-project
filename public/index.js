var current = document.querySelector('.mon')
var triceps = document.querySelector('.tricep')
var biceps = document.querySelector('.bicep')
var legs = document.querySelector('.leg')

/*
function userAction(destination) {
    var xhttp = new XMLHttpRequest();
	var url = "https://limitless-woodland-36659.herokuapp.com/https://wikipedia-image-scraper.azurewebsites.net/getFirstImage?WikiUrl=https://en.wikipedia.org/wiki/"
	url += destination
	xhttp.open("GET", url, true);
    xhttp.onload = function() {
         if (xhttp.readyState == 4 && xhttp.status == 200) {
			console.log('Image Loaded')
            var img = document.createElement('img')
			img.src = xhttp.firstImage.src
			add = document.getElementsByClassName(destination)
			add[0].appendChild(img)
			xhttp.send(null);
         }
    }; 
}
*/
//https://limitless-woodland-36659.herokuapp.com/https://wikipedia-image-scraper.azurewebsites.net/getFirstImage
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
			console.log(result)
			add[0].src = result.firstImage.src
		})
		.catch(err=>console.log(err))
	fetch(tricep)
		.then(res => res.json())
		.then(result => {
			console.log(result)
			add[1].src = result.firstImage.src
		})
		.catch(err=>console.log(err))
	fetch(leg)
		.then(res => res.json())
		.then(result => {
			console.log(result)
			add[2].src = result.firstImage.src
		})
		.catch(err=>console.log(err))
	fetch(exercise)
		.then(res => res.json())
		.then(result => {
			console.log(result)
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
