// Fetch Weather API
// Seperate and log element arrays
// Assign elements to given text and images
// Create search function
// Create save function set to save cities in an array

// Uncaught SyntaxError: import declarations may only appear at top level of a module
// import {apiKey} from "./environment.js";

console.log("Gaming");

// navigator.geolocation.getCurrentPosition(success, errorFunc);

// {
//   coords: {
//     latitude: 10.0;
//     longitude: 20.0;
//   }
// }

// function success(position) {
//   console.log("Our latitude: " + position.coords.latitude);
//   console.log("Our longitude: " + position.coords.longitude);
// }

// function errorFunc(error){
//     console.log(error.message);
// }

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

async function apiCall() {
  const promise = await fetch(
    `../data/weather.json`
  );

  const data = await promise.json();
  let temp = data.list[0].main.temp;
  let temp_min = data.list[0].main.temp_min;
  let temp_max = data.list[0].main.temp_max;
  let city = data.city.name
  ;
  let state = data.city.state;
  let country = data.city.country;
  ;
  let weather = data.list[0].weather[0].main;
  ;
  let conditions = data.list[0].weather[0].description;
  ;
  let icon = data.list[0].weather[0].icon;
  ;
  let wind = data.list[0].wind.speed;
  ;
  let humidity = data.list[0].main.humidity;
  ;
//   let tempC;
//   let temp_minC;
//   let temp_maxC;

switch (weather){
    case 'Clouds':
        weather = 'Cloudy';
        break;
}

  console.log(data);
  state ? console.log(`${city}, ${state}`) : console.log(`${city}, ${country}`);
  console.log(`Weather: ${weather}`);
  console.log(`${conditions}`);
  console.log(`${icon}`);
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
