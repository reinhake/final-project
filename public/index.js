var current = document.querySelector('.current-exercises')
var triceps = document.querySelector('.tricep')
var biceps = document.querySelector('.bicep')
var legs = document.querySelector('.leg')


function UserAction() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
             alert(this.responseText);
         }
    };
    xhttp.open("POST", "http://CS361.com/imagescraper", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send("Biceps");
}

document.querySelectorAll(".exercise").forEach(item => {
	item.addEventListener('click', function (){
		UserAction()
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

var dotw = document.querySelector('.weekday')
var selector = document.querySelector('#day')

selector.addEventListener("click", function () {
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
})

