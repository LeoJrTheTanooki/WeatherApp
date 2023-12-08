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

console.log("Gaming");
let lat;
let lon;
let f_toggle;
let c_toggle;
const favBtn = document.getElementById("favBtn");
let fMode = true;
let locSaved = false;
let userInput = document.getElementById("userInput");
let apiWeatherLink;
let apiForecastLink;

favBtn.addEventListener("click", function () {
  favToggle();
});

function favToggle() {
  console.log("Favorite game is Rhythm Heaven");
  if (!locSaved) {
    favBtn.src = "./assets/star.png";
    locSaved = true;
  } else {
    favBtn.src = "./assets/starline.png";
    locSaved = false;
  }
}

async function apiCall() {
  if (fMode) {
  }

  const promise = await fetch(apiWeatherLink);

  const data = await promise.json();
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
  let location = state ? `${city}, ${state}` : `${city}, ${country}`;

  let locationElmnt = document.getElementById("location");
  let weatherElmnt = document.getElementById("weather");
  let windElmnt = document.getElementById("wind");
  let humidityElmnt = document.getElementById("humidity");
  let tempElmnt = document.getElementById("temp");
  let tempMaxElmnt = document.getElementById("temp_max");
  let tempMinElmnt = document.getElementById("temp_min");
  let iconTodayElmnt = document.getElementById("iconToday");

  //   let tempC;
  //   let temp_minC;
  //   let temp_maxC;

  switch (weather) {
    case "Clear":
      weather = "Clear Sky";
      break;
    case "Clouds":
      weather = "Cloudy";
      break;
  }
  console.log(data);
  console.log(location);
  console.log(`Weather: ${weather}`);
  console.log(`Conditions: ${conditions}`);
  console.log(`Icon: ${icon}`);
  console.log(`Wind speed: ${wind}`);
  console.log(`Humidity: ${humidity}`);
  console.log(`Temperature: ${temp}°F`);
  console.log(`Min Temp: ${temp_min}°F`);
  console.log(`Max Temp: ${temp_max}°F`);

  // console.log(`Temperature: ${Math.round(temp)}°C`);
  // console.log(`Min Temp: ${Math.round(temp_min)}°C`);
  // console.log(`Max Temp: ${Math.round(temp_max)}°C`);

  locationElmnt.textContent = location;
  weatherElmnt.textContent = weather;
  windElmnt.textContent = `${Math.round(wind.speed)}m/s`;
  humidityElmnt.textContent = `${humidity}%`;
  tempElmnt.textContent = temp;
  tempMaxElmnt.textContent = `${temp_max}°F`;
  tempMinElmnt.textContent = `${temp_min}°F`;
  iconTodayElmnt.src = `./assets/weathericons/${icon}.png`;

  console.log();

  const promise2 = await fetch(apiForecastLink);
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

    document.getElementById(`temp${day}`).textContent = foreTemp[o];
    document.getElementById(`wind${day}`).textContent = `${foreWind[o]} m/s`;
    document.getElementById(`humidity${day}`).textContent = `${foreHum[o]}%`;

    document.getElementsByClassName(`day${day}`)[0].textContent = foreDay[o];
    document.getElementsByClassName(`day${day}`)[1].textContent = foreDay[o];
    document.getElementsByClassName(
      `temp_max${day}`
    )[0].textContent = `H: ${foreTempMax[o]}°`;
    document.getElementsByClassName(
      `temp_max${day}`
    )[1].textContent = `${foreTempMax[o]}°`;
    document.getElementsByClassName(
      `temp_min${day}`
    )[0].textContent = `L: ${foreTempMin[o]}°`;
    document.getElementsByClassName(
      `temp_min${day}`
    )[1].textContent = `${foreTempMin[o]}°`;
  }
}

navigator.geolocation.getCurrentPosition(success, errorFunc);

function success(position) {
  console.log("Our latitude: " + position.coords.latitude);
  console.log("Our longitude: " + position.coords.longitude);
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  apiWeatherLink = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&id=${apiKey}&units=imperial`;
  apiForecastLink = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&id=${apiKey}&units=imperial`;
  apiCall();
}

function errorFunc(error) {
  console.log(error.message);
}

async function findLocation() {
  let locationInput = userInput.value.toLowerCase();
  apiWeatherLink = `http://api.openweathermap.org/data/2.5/weather?q=${locationInput}&id=${apiKey}&units=imperial`;
  apiForecastLink = `http://api.openweathermap.org/data/2.5/forecast?q=${locationInput}&id=${apiKey}&units=imperial`;
  apiCall();
}

userInput.addEventListener("keypress", function (e) {
  if(e.key === "Enter"){
    findLocation();
  }
});

/* Return the following elements
 * Temperature F X
 * Min Temp F X
 * Max Temp F X
 * Temperature C
 * Min Temp C
 * Max Temp C
 * City
 * State
 * Weather
 * Wind
 * Humidity
 * Next Five Day Forecasts
 */
