let currentDate = new Date();

let hour = currentDate.getHours();

let minutes = currentDate.getMinutes();

let days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"];

let day = days[currentDate.getDay()];

let date = document.querySelector("#date");
date.innerHTML = `Last updated :${day} ${hour}:${minutes} `;

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", handleSubmit);



function searchCity(city){
  let apiKey = "7b2a0e81e147668e4ff3e5af704d7dbe";
  let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityTemperature);

}

function handleSubmit(event) {

  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
  
  

}

function showCityTemperature(response) {
document.querySelector("#city-name").innerHTML = response.data.name;
let cityTemp = Math.round(response.data.main.temp);
let temperature = document.querySelector("#temperature");
 
 temperature.innerHTML = `${cityTemp}<sup>°C</sup>`;

 document.querySelector("#humidity").innerHTML = `Humidity :${response.data.main.humidity}%`;
 let wind = document.querySelector("#wind");
 let windspeed = Math.round(response.data.wind.speed);
wind.innerHTML = `Wind :${windspeed} km/h`;
document.querySelector("#description").innerHTML= response.data.weather[0].description;


}


function getWeather (position){

let latitude =position.coords.latitude;
let longitude = position.coords.longitude;
let apiKey = "7b2a0e81e147668e4ff3e5af704d7dbe";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showCityTemperature);


  
}

function getCurrentLocation(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getWeather);


}



let currentLocationButton = document.querySelector(".current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);



searchCity("Sydney");



  
  












