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
let favBtn = document.getElementById("favBtn");
let fMode = true;
let locSaved = false;

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

navigator.geolocation.getCurrentPosition(success, errorFunc);

{
  coords: {
    latitude: 10.0;
    longitude: 20.0;
  }
}

function success(position) {
  console.log("Our latitude: " + position.coords.latitude);
  console.log("Our longitude: " + position.coords.longitude);
  lat = position.coords.latitude;
  lon = position.coords.longitude;

  async function apiCall() {
    if (fMode) {
    }

    const promise = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&id=${apiKey}&units=imperial`
    );

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

    document.getElementById("location").textContent = location;
    document.getElementById("weather").textContent = weather;
    document.getElementById("wind").textContent = wind;
    document.getElementById("humidity").textContent = humidity;
    document.getElementById("temp").textContent = temp;
    document.getElementById("temp_max").textContent = `${temp_max}°F`;
    document.getElementById("temp_min").textContent = `${temp_min}°F`;
    document.getElementById("wind").textContent = `${wind}m/s`;
    document.getElementById("humidity").textContent = `${humidity}%`;
    document.getElementById(
      "iconToday"
    ).src = `./assets/weathericons/${icon}.png`;

    console.log();

    const promise2 = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&id=${apiKey}&units=imperial`
    );
    const foreData = await promise2.json();
    for (let i = 1; i < 5; i++) {
    let d1Day = new Date(foreData.list[0].dt_txt);

    switch (d1Day.getDay()) {
      case 0:
        d1Day = "Mon";
        break;
      case 1:
        d1Day = "Tue";
        break;
      case 2:
        d1Day = "Wed";
        break;
      case 3:
        d1Day = "Thu";
        break;
      case 4:
        d1Day = "Fri";
        break;
      case 5:
        d1Day = "Sat";
        break;
      case 6:
        d1Day = "Sun";
        break;
    }

      console.log(d1Day);

      let d1Average = [];
      console.log(foreData.list[0].main.temp + foreData.list[1].main.temp);
      for (let i = 0; i < 8; i++) {
        d1Average.push(foreData.list[i].main.temp);
        console.log(foreData.list[i].main.temp);
      }
      console.log(d1Average);
      const sum = d1Average.reduce((partialSum, a) => partialSum + a, 0);
      console.log(sum);
      const average = Math.round(sum / 8);
      console.log(average);
    }
  }

  apiCall();
}

function errorFunc(error) {
  console.log(error.message);
}

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
