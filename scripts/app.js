// Fetch Weather API
// Seperate and log element arrays
// Assign elements to given text and images
// Create search function
// Create save function set to save cities in an array

// Uncaught SyntaxError: import declarations may only appear at top level of a module
import { apiKey } from "./environment.js";

console.log("Gaming");
let lat;
let lon;

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
    const promise = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&id=${apiKey}&units=imperial`
    );
    // const promise = await fetch(
    //   `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&id=${apiKey}&units=imperial`
    // );

    const data = await promise.json();
    let temp = data.main.temp;
    let temp_min = data.main.temp_min;
    let temp_max = data.main.temp_max;
    let city = data.name;
    let state = data.state;
    let country = data.sys.country;
    let weather = data.weather[0].main;
    let conditions = data.weather[0].description;
    let icon = data.weather[0].icon;
    let wind = data.wind.speed;
    let humidity = data.main.humidity;
    let location = state ? `${city}, ${state}` : `${city}, ${country}`;
    //   let tempC;
    //   let temp_minC;
    //   let temp_maxC;

    switch (weather) {
      case "Clouds":
        weather = "Cloudy";
        break;
    }
    // console.log(
    //   `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&id=${apiKey}&units=imperial`
    // );
    console.log(data);
    console.log(location);
    console.log(`Weather: ${weather}`);
    console.log(`Conditions: ${conditions}`);
    console.log(`Icon: ${icon}`);
    console.log(`Wind speed: ${wind}`);
    console.log(`Wind speed: ${humidity}`);
    console.log(`Temperature: ${Math.round(temp)}°F`);
    console.log(`Min Temp: ${Math.round(temp_min)}°F`);
    console.log(`Max Temp: ${Math.round(temp_max)}°F`);
    // console.log(`Temperature: ${Math.round(temp)}°C`);
    // console.log(`Min Temp: ${Math.round(temp_min)}°C`);
    // console.log(`Max Temp: ${Math.round(temp_max)}°C`);
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
