// Fetch Weather API
// Seperate and log element arrays
// Assign elements to given text and images
// Use getElementById() to assign
// Use getElementById().textContent display
// For images use a switch case
// Create search function
// Create save function set to save cities in an array

// Uncaught SyntaxError: import declarations may only appear at top level of a module
import { apiKey } from "./environment.js";

let lat;
let lon;
let locationVar;
const favBtn = document.getElementById("favBtn");
const tempToggle = document.getElementById("tempToggle");
let tempF = true;
let unitMode = "imperial";
let degreeMode = "°F";
let unDegreeMode = "°C";
let locSaved = false;
let userInput = document.getElementById("userInput");
let apiWeatherLink;
let apiForecastLink;
let savedLocations = [];
if (localStorage.getItem("starred locations")) {
  savedLocations = JSON.parse(localStorage.getItem("starred locations"));
}
let locationElmnt = document.getElementById("location");
let weatherElmnt = document.getElementById("weather");
let windElmnt = document.getElementById("wind");
let humidityElmnt = document.getElementById("humidity");
let tempElmnt = document.getElementById("temp");
let tempMaxElmnt = document.getElementById("temp_max");
let tempMinElmnt = document.getElementById("temp_min");
let iconTodayElmnt = document.getElementById("iconToday");
let dropDownElmnt = document.getElementById("savedDropDown");
let listElmnt = document.getElementsByTagName("li");
userInput.value = ""


function generateSaved() {
  modeCheck();
  dropDownElmnt.innerHTML = "";
  for (let locIndex = 0; locIndex < savedLocations.length; locIndex++) {
    dropDownElmnt.innerHTML += `<li><a class="dropdown-item" href="#" id="item${locIndex}">${savedLocations[locIndex]}</a></li>`;
    console.log(savedLocations);
  }
  for (let locIndex = 0; locIndex < savedLocations.length; locIndex++) {
    listElmnt[locIndex].addEventListener("click", function () {
      apiWeatherLink = `http://api.openweathermap.org/data/2.5/weather?q=${savedLocations[locIndex]}&id=${apiKey}`;
      apiForecastLink = `http://api.openweathermap.org/data/2.5/forecast?q=${savedLocations[locIndex]}&id=${apiKey}`;
      apiCall();
    });
  }
}

generateSaved();

favBtn.addEventListener("click", function () {
  favToggle();
});

tempToggle.addEventListener("click", function(){
  if(tempF){
    tempF = false;
    unitMode = "&units=imperial";
    degreeMode = "°F";
  } else {
    tempF = true;
    unitMode = "&units=metric";
    degreeMode = "°C";
  }

  modeCheck();
  apiCall();
});

function favToggle() {
  console.log(savedLocations);
  if (!locSaved) {
    favBtn.src = "./assets/star.png";
    savedLocations.push(locationVar);
    locSaved = true;
  } else {
    favBtn.src = "./assets/starline.png";
    for (let locIndex = 0; locIndex < savedLocations.length; locIndex++) {
      if (savedLocations[locIndex] === locationVar) {
        savedLocations.splice(locIndex, 1);
      }
    }
    locSaved = false;
  }
  generateSaved();
  localStorage.setItem("starred locations", JSON.stringify(savedLocations));
}

async function apiCall() {
  userInput.value = "";
  const promise = await fetch(apiWeatherLink + unitMode);
  console.log(apiWeatherLink + unitMode);
  const data = await promise.json();
  console.log(data);
  let temp = Math.round(data.main.temp);
  let temp_min = Math.round(data.main.temp_min);
  let temp_max = Math.round(data.main.temp_max);
  let city = data.name;
  let state = data.state;
  let country = data.sys.country;
  let weather = data.weather[0].main;
  let conditions = data.weather[0].description;
  let icon = data.weather[0].icon;
  let wind = Math.round(data.wind.speed);
  let humidity = data.main.humidity;
  locationVar = state ? `${city}, ${state}` : `${city}, ${country}`;
  console.log(locationVar);
  for (let locIndex = 0; locIndex < savedLocations.length; locIndex++) {
    if (savedLocations[locIndex] === locationVar) {
      favBtn.src = "./assets/star.png";
      locSaved = true;
    } else {
      favBtn.src = "./assets/starline.png";
      locSaved = false;
    }
  }

  document.getElementById("currentTemp").textContent = degreeMode
  document.getElementById("tempToggle").textContent = unDegreeMode
  document.getElementById("fToggle1").textContent = degreeMode
  document.getElementById("cToggle1").textContent = unDegreeMode
  document.getElementById("fToggle2").textContent = degreeMode
  document.getElementById("cToggle2").textContent = unDegreeMode
  document.getElementById("fToggle3").textContent = degreeMode
  document.getElementById("cToggle3").textContent = unDegreeMode
  document.getElementById("fToggle4").textContent = degreeMode
  document.getElementById("cToggle4").textContent = unDegreeMode
  document.getElementById("fToggle5").textContent = degreeMode
  document.getElementById("cToggle5").textContent = unDegreeMode

  switch (weather) {
    case "Clear":
      weather = "Clear Sky";
      break;
    case "Clouds":
      weather = "Cloudy";
      break;
  }
  console.log(`Weather: ${weather}`);
  console.log(`Conditions: ${conditions}`);
  console.log(`Icon: ${icon}`);
  console.log(`Wind speed: ${wind}`);
  console.log(`Humidity: ${humidity}`);
  console.log(`Temperature: ${temp}${degreeMode}`);
  console.log(`Min Temp: ${temp_min}${degreeMode}`);
  console.log(`Max Temp: ${temp_max}${degreeMode}`);

  locationElmnt.textContent = locationVar;
  weatherElmnt.textContent = weather;
  windElmnt.textContent = `${wind}m/s`;
  console.log(wind);
  humidityElmnt.textContent = `${humidity}%`;
  tempElmnt.textContent = temp;
  tempMaxElmnt.textContent = `${temp_max}${degreeMode}`;
  tempMinElmnt.textContent = `${temp_min}${degreeMode}`;
  iconTodayElmnt.src = `./assets/weathericons/${icon}.png`;

  console.log();

  const promise2 = await fetch(apiForecastLink + unitMode);
  const foreData = await promise2.json();
  console.log(foreData);

  // Push final results into an array
  // .textContent each array value
  // Find general weather of each day
  // Find image IDs

  let i = 0;
  let j = 8;
  let foreTemp = [];
  let foreTempMax = [];
  let foreTempMin = [];
  let foreWind = [];
  let foreHum = [];
  let foreDay = [];

  for (let m = 0; m < 5; m++) {
    // Declaring arrays for data
    let collectTempAvg = [];
    let collectMaxTemp = [];
    let collectMinTemp = [];
    let collectWind = [];
    let collectHum = [];
    let collectIcon = [];
    let day;

    // Day of the Week
    day = new Date(foreData.list[i].dt_txt);

    switch (day.getDay()) {
      case 0:
        day = "Sun";
        break;
      case 1:
        day = "Mon";
        break;
      case 2:
        day = "Tue";
        break;
      case 3:
        day = "Wed";
        break;
      case 4:
        day = "Thu";
        break;
      case 5:
        day = "Fri";
        break;
      case 6:
        day = "Sat";
        break;
    }

    console.log(day);
    foreDay.push(day);

    // Time Tracking
    console.log(foreData.list[i].dt_txt);

    // Gathering data from list
    for (i; i < j; i++) {
      // Temp
      collectTempAvg.push(foreData.list[i].main.temp);

      // Max Temp
      collectMaxTemp.push(foreData.list[i].main.temp_max);

      // Min Temp
      collectMinTemp.push(foreData.list[i].main.temp_min);

      // Wind Speed
      collectWind.push(foreData.list[i].wind.speed);

      // Humidity
      collectHum.push(foreData.list[i].main.humidity);

      // Icons
      collectIcon.push(foreData.list[i].weather.icon);
    }

    // Creating average for temperature element
    let tempSum1 = collectTempAvg.reduce((partialSum, a) => partialSum + a, 0);
    let tempAvg1 = Math.round(tempSum1 / 8);
    console.log(`Temp: ${tempAvg1}`);
    foreTemp.push(tempAvg1);

    // Gathering greatest temp for max temp
    let largest = collectMaxTemp[0];
    for (let k = 0; k < collectMaxTemp.length; k++) {
      if (collectMaxTemp[k] > largest) {
        largest = Math.round(collectMaxTemp[k]);
      }
    }
    console.log(`Max Temp: ${largest}`);
    foreTempMax.push(largest);

    // Gathering least temp for min temp
    let smallest = collectMinTemp[0];
    for (let k = 0; k < collectMinTemp.length; k++) {
      if (collectMinTemp[k] < smallest) {
        smallest = Math.round(collectMinTemp[k]);
      }
    }
    console.log(`Min Temp: ${smallest}`);
    foreTempMin.push(smallest);

    // Creating average for wind speed
    let windSum1 = collectWind.reduce((partialSum, a) => partialSum + a, 0);
    let windAvg1 = Math.round(windSum1 / 8);
    console.log(`Wind Speed: ${windAvg1}m/s`);
    foreWind.push(windAvg1);

    // Creating average for humidity
    let humSum1 = collectHum.reduce((partialSum, a) => partialSum + a, 0);
    let humAvg1 = Math.round(humSum1 / 8);
    console.log(`Humidity: ${humAvg1}%`);
    foreHum.push(humAvg1);

    // Culling appropriate image

    console.log(`Icon ID: ?`);

    j += 8;
  }

  console.log(foreDay);
  console.log(foreTemp);
  console.log(foreTempMax);
  console.log(foreTempMin);
  console.log(foreWind);
  console.log(foreHum);

  for (let day = 1; day < 6; day++) {
    let o = day - 1;

    document.getElementById(`temp${day}`).textContent =
      Math.round(foreTemp[o]);
    document.getElementById(`wind${day}`).textContent = `${Math.round(
      foreWind[o]
    )} m/s`;
    document.getElementById(`humidity${day}`).textContent = `${foreHum[o]}%`;

    document.getElementsByClassName(`day${day}`)[0].textContent = foreDay[o];
    document.getElementsByClassName(`day${day}`)[1].textContent = foreDay[o];
    document.getElementsByClassName(
      `temp_max${day}`
    )[0].textContent = `H: ${Math.round(foreTempMax[o])}°`;
    document.getElementsByClassName(`temp_max${day}`)[1].textContent =
      Math.round(foreTempMax[o]) + degreeMode;
    document.getElementsByClassName(
      `temp_min${day}`
    )[0].textContent = `L: ${Math.round(foreTempMin[o])}°`;
    document.getElementsByClassName(`temp_min${day}`)[1].textContent =
      Math.round(foreTempMin[o]) + degreeMode;
  }
}

function modeCheck() {
  if (tempF) {
    unitMode = "&units=imperial";
    degreeMode = "°F";
    unDegreeMode = "°C";
  } else {
    unitMode = "&units=metric";
    degreeMode = "°C";
    unDegreeMode = "°F";
  }
}

navigator.geolocation.getCurrentPosition(success, errorFunc);

function success(position) {
  modeCheck();
  console.log("Our latitude: " + position.coords.latitude);
  console.log("Our longitude: " + position.coords.longitude);
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  apiWeatherLink = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&id=${apiKey}`;
  apiForecastLink = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&id=${apiKey}`;
  apiCall();
}

function errorFunc(error) {
  console.log(error.message);
}

async function findLocation() {
  modeCheck();
  let locationInput = userInput.value.toLowerCase();
  apiWeatherLink = `http://api.openweathermap.org/data/2.5/weather?q=${locationInput}&id=${apiKey}`;
  apiForecastLink = `http://api.openweathermap.org/data/2.5/forecast?q=${locationInput}&id=${apiKey}`;
  apiCall();
}

userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    findLocation();
  }
});
