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
      let d1CollectTempAvg = [];
      let d1CollectMaxTemp = [];
      let d1CollectMinTemp = [];
      let d1CollectWind = [];
      let d1CollectHum = [];
      let d1CollectIcon = [];
      let d1Day;

      // Day of the Week
      d1Day = new Date(foreData.list[i].dt_txt);

      switch (d1Day.getDay()) {
        case 0:
          d1Day = "Sun";
          break;
        case 1:
          d1Day = "Mon";
          break;
        case 2:
          d1Day = "Tue";
          break;
        case 3:
          d1Day = "Wed";
          break;
        case 4:
          d1Day = "Thu";
          break;
        case 5:
          d1Day = "Fri";
          break;
        case 6:
          d1Day = "Sat";
          break;
      }

      console.log(d1Day);
      foreDay.push(d1Day);

      // Time Tracking
      console.log(foreData.list[i].dt_txt);

      // Gathering data from list
      for (i; i < j; i++) {
        // Temp
        d1CollectTempAvg.push(foreData.list[i].main.temp);

        // Max Temp
        d1CollectMaxTemp.push(foreData.list[i].main.temp_max);

        // Min Temp
        d1CollectMinTemp.push(foreData.list[i].main.temp_min);

        // Wind Speed
        d1CollectWind.push(foreData.list[i].wind.speed);

        // Humidity
        d1CollectHum.push(foreData.list[i].main.humidity);

        // Icons
        d1CollectIcon.push(foreData.list[i].weather.icon);
      }

      // Creating average for temperature element
      let tempSum1 = d1CollectTempAvg.reduce(
        (partialSum, a) => partialSum + a,
        0
      );
      let tempAvg1 = Math.round(tempSum1 / 8);
      console.log(`Temp: ${tempAvg1}`);
      foreTemp.push(tempAvg1);

      // Gathering greatest temp for max temp
      let largest = d1CollectMaxTemp[0];
      for (let k = 0; k < d1CollectMaxTemp.length; k++) {
        if (d1CollectMaxTemp[k] > largest) {
          largest = d1CollectMaxTemp[k];
        }
      }
      console.log(`Max Temp: ${largest}`);
      foreTempMax.push(largest);


      // Gathering least temp for min temp
      let smallest = d1CollectMinTemp[0];
      for (let l = 0; l < d1CollectMinTemp.length; l++) {
        if (d1CollectMinTemp[l] < smallest) {
          smallest = d1CollectMinTemp[l];
        }
      }
      console.log(`Min Temp: ${smallest}`);
      foreTempMin.push(smallest);

      // Creating average for wind speed
      let windSum1 = d1CollectWind.reduce((partialSum, a) => partialSum + a, 0);
      let windAvg1 = Math.round(windSum1 / 8);
      console.log(`Wind Speed: ${windAvg1}m/s`);
      foreWind.push(windAvg1);


      // Creating average for humidity
      let humSum1 = d1CollectHum.reduce((partialSum, a) => partialSum + a, 0);
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

    // for(let n = 1; n < 6; n++){
    // document.getElementById(`temp${n}`.textContent) = foreTemp[];
    // document.getElementById(`temp_max${n}`.textContent) = foreTempMax[];
    // document.getElementById(`temp_min${n}`.textContent) = foreTempMin[];
    // document.getElementById(`wind${n}`.textContent) = foreWind[];
    // document.getElementById(`humidity${n}`.textContent) = foreHum[];
    // }
    
    // Day 1
    document.getElementById(`day1`).textContent = foreDay[0];
    document.getElementById(`temp_max1`).textContent = foreTempMax[0];
    document.getElementById(`temp_min1`).textContent = foreTempMin[0];
    document.getElementById(`day11`).textContent = foreDay[0];
    document.getElementById(`temp_max11`).textContent = foreTempMax[0];
    document.getElementById(`temp_min11`).textContent = foreTempMin[0];
    document.getElementById(`temp1`).textContent = foreTemp[0];
    document.getElementById(`wind1`).textContent = foreWind[0];
    document.getElementById(`humidity1`).textContent = foreHum[0];

    // Day 2
    document.getElementById(`day2`).textContent = foreDay[1];
    document.getElementById(`temp_max2`).textContent = foreTempMax[1];
    document.getElementById(`temp_min2`).textContent = foreTempMin[1];
    document.getElementById(`day22`).textContent = foreDay[1];
    document.getElementById(`temp_max22`).textContent = foreTempMax[1];
    document.getElementById(`temp_min22`).textContent = foreTempMin[1];
    document.getElementById(`temp2`).textContent = foreTemp[1];
    document.getElementById(`wind2`).textContent = foreWind[1];
    document.getElementById(`humidity2`).textContent = foreHum[1];

    // Day 3
    document.getElementById(`day3`).textContent = foreDay[2];
    document.getElementById(`temp_max3`).textContent = foreTempMax[2];
    document.getElementById(`temp_min3`).textContent = foreTempMin[2];
    document.getElementById(`day33`).textContent = foreDay[2];
    document.getElementById(`temp_max33`).textContent = foreTempMax[2];
    document.getElementById(`temp_min33`).textContent = foreTempMin[2];
    document.getElementById(`temp3`).textContent = foreTemp[2];
    document.getElementById(`wind3`).textContent = foreWind[2];
    document.getElementById(`humidity3`).textContent = foreHum[2];

    // Day 4
    document.getElementById(`day4`).textContent = foreDay[3];
    document.getElementById(`temp_max4`).textContent = foreTempMax[3];
    document.getElementById(`temp_min4`).textContent = foreTempMin[3];
    document.getElementById(`day44`).textContent = foreDay[3];
    document.getElementById(`temp_max44`).textContent = foreTempMax[3];
    document.getElementById(`temp_min44`).textContent = foreTempMin[3];
    document.getElementById(`temp4`).textContent = foreTemp[3];
    document.getElementById(`wind4`).textContent = foreWind[3];
    document.getElementById(`humidity4`).textContent = foreHum[3];

    // Day 5
    document.getElementById(`day5`).textContent = foreDay[4];
    document.getElementById(`temp_max5`).textContent = foreTempMax[4];
    document.getElementById(`temp_min5`).textContent = foreTempMin[4];
    document.getElementById(`day55`).textContent = foreDay[4];
    document.getElementById(`temp_max55`).textContent = foreTempMax[4];
    document.getElementById(`temp_min55`).textContent = foreTempMin[4];
    document.getElementById(`temp5`).textContent = foreTemp[4];
    document.getElementById(`wind5`).textContent = foreWind[4];
    document.getElementById(`humidity5`).textContent = foreHum[4];


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
