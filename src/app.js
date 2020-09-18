function addDayTime(date) {
  let hours = now.getHours().toString();
  if (now.getHours() < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes().toString();
  if (now.getMinutes() < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  return `${day}, ${hours}:${minutes}`;
}

let now = new Date();
let currentDayTime = document.querySelector("#current-day-and-time");

currentDayTime.innerHTML = addDayTime(now);

//current weather functions
function currentWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#main-temp");
  currentTemp.innerHTML = `${temperature}`;

  let feelsLike = Math.round(response.data.main.feels_like);
  let currentFeelsLike = document.querySelector("#feels-like");
  currentFeelsLike.innerHTML = `${feelsLike}ºC`;

  let highTemp = Math.round(response.data.main.temp_max);
  let currentHighTemp = document.querySelector("#high-temp");
  currentHighTemp.innerHTML = `${highTemp}ºC`;

  let lowTemp = Math.round(response.data.main.temp_min);
  let currentLowTemp = document.querySelector("#low-temp");
  currentLowTemp.innerHTML = `${lowTemp}ºC`;

  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `${humidity}%`;

  let windSpeed = response.data.wind.speed;
  let currentWindSpeed = document.querySelector("#wind-speed");
  currentWindSpeed.innerHTML = `${windSpeed}m/s`;
}

function cityInput(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search");

  let apiKey = "b1864bb25c40d16f7c3d8c9b32fea220";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "metric";
  let currentPositionUrl = `${apiUrl}&q=${city.value}&appid=${apiKey}&units=${units}`;

  axios.get(currentPositionUrl).then(currentWeather);
  axios.get(currentPositionUrl).then(cityName);
  city.value = "";
}

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", cityInput);

//functionality for the current location link
function cityName(response) {
  console.log(response.data.name);
  let city = response.data.name;
  let searchedCity = document.querySelector("#searched-city");

  searchedCity.innerHTML = city;
}

function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "b1864bb25c40d16f7c3d8c9b32fea220";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "metric";
  let currentPositionUrl = `${apiUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  console.log(currentPositionUrl);

  axios.get(currentPositionUrl).then(currentWeather);
  axios.get(currentPositionUrl).then(cityName);
}

function currentGeoLoc(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let currentLocLink = document.querySelector("#current-loc");
currentLocLink.addEventListener("click", currentGeoLoc);

//functionality for reset button
function resetHome(event) {
  let city = "London";
  let apiKey = "b1864bb25c40d16f7c3d8c9b32fea220";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "metric";
  let homeUrl = `${apiUrl}&q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(homeUrl).then(currentWeather);
  let displayCity = document.querySelector("#searched-city");
  displayCity.innerHTML = city;
}

let resetLink = document.querySelector("#reset");
resetLink.addEventListener("click", resetHome);

//celsius and farenheit temperature
function celsiusTemp(event) {
  event.preventDefault();
  let mainTemp = document.querySelector("#main-temp");
  let showCelsiusNumber = 16;
  mainTemp.innerHTML = showCelsiusNumber;
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", celsiusTemp);

function farenheitTemp(event) {
  event.preventDefault();
  let mainTemp = document.querySelector("#main-temp");
  let showFarenheitNumber = 61;
  mainTemp.innerHTML = showFarenheitNumber;
}

let farenheit = document.querySelector("#farenheit");
farenheit.addEventListener("click", farenheitTemp);
