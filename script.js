let currentDate = new Date();

let hour = currentDate.getHours();
if (hour <10) {
  hour =`0${hour}`;
}


let minutes = currentDate.getMinutes();
if(minutes<10){
  minutes =`0${minutes}`;
}

let days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"];

let day = days[currentDate.getDay()];

let date = document.querySelector("#date");
date.innerHTML = `Last updated :${day} ${hour}:${minutes} `;

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", handleSubmit);



function displayWeatherForecast(){
let forecast = document.querySelector("#weather-forecast");
let forecastHTML =`<div class="row">`;
forecastHTML = forecastHTML +`

      <div class="col-2">Wed <br> <img class="icons" src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/084/639/original/cloudy.png?1686045870" alt="">
      <br>
        <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-max">15°</span>/
        <span class="weather-forecast-temperature-min">10°</span></div>


    </div>


`;


forecastHTML = forecastHTML +`

   
      <div class="col-2">Wed <br> <img class="icons" src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/084/639/original/cloudy.png?1686045870" alt="">
      <br>
        <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-max">15°</span>/
        <span class="weather-forecast-temperature-min">10°</span></div>


    </div>

`;
forecastHTML =forecastHTML +`</div>`;

forecast.innerHTML = forecastHTML;


}







function searchCity(city){
  let apiKey = "85cff465ab5546t9e67d063oea6b4af3";
  let apiUrl =`https://api.shecodes.io/weather/v1/current?query=${city}&key=85cff465ab5546t9e67d063oea6b4af3&units=metric`;
  axios.get(apiUrl).then(showCityTemperature);

}

function handleSubmit(event) {

  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
  
  

}

function showCityTemperature(response) {
document.querySelector("#city-name").innerHTML = response.data.city;
celsiusTemperature = Math.round(response.data.temperature.current);
let temperature = document.querySelector("#temperature");
 
 temperature.innerHTML = `${celsiusTemperature}`;

 document.querySelector("#humidity").innerHTML = `Humidity :${response.data.temperature.humidity}%`;
 let wind = document.querySelector("#wind");
 let windspeed = Math.round(response.data.wind.speed);
wind.innerHTML = `Wind :${windspeed} km/h`;
document.querySelector("#description").innerHTML= response.data.condition.description;
let icon = document.querySelector(".icon-name");
icon.setAttribute ("src",`http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
icon.setAttribute("alt",response.data.condition.icon);
displayWeatherForecast();

}


function getWeather (position){
let latitude =position.coords.latitude;
let longitude = position.coords.longitude;
let apiKey = "85cff465ab5546t9e67d063oea6b4af3";
let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}`;

axios.get(apiUrl).then(showCityTemperature);


  
}

function getCurrentLocation(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getWeather);


}

function showFahrenheitTemperature(event){
  event.preventDefault();
  let fahrenheitTemp =Math.round((celsiusTemperature * 9/5) + 32);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = fahrenheitTemp;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
 


}

function showCelsiusTemperature(event){
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = celsiusTemperature;
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");


}


let celsiusTemperature =null;



let currentLocationButton = document.querySelector(".current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);


  let fahrenheitLink = document.querySelector(".fahrenheit-link");
  fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

  let celsiusLink = document.querySelector(".celsius-link");
  celsiusLink.addEventListener("click", showCelsiusTemperature);




  

searchCity("Sydney");











