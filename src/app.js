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
  currentFeelsLike.innerHTML = `${feelsLike}`;

  let highTemp = Math.round(response.data.main.temp_max);
  let currentHighTemp = document.querySelector("#high-temp");
  currentHighTemp.innerHTML = `${highTemp}`;

  let lowTemp = Math.round(response.data.main.temp_min);
  let currentLowTemp = document.querySelector("#low-temp");
  currentLowTemp.innerHTML = `${lowTemp}`;

  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `${humidity}%`;

  let windSpeed = response.data.wind.speed;
  let currentWindSpeed = document.querySelector("#wind-speed");
  currentWindSpeed.innerHTML = `${windSpeed}m/s`;

  let icon = response.data.weather[0].icon;
  let currentIconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  let currentIcon = document.querySelector("#current-weather-icon");
  currentIcon.src = `${currentIconUrl}`;
}

function cityInput(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search");

  let apiKey = "b1864bb25c40d16f7c3d8c9b32fea220";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let farenheitLink = document.querySelector("#farenheit");
  if (farenheitLink.classList.contains("inactive")) {
    units = "imperial";
  } else {
    units = "metric";
  }
  let currentPositionUrl = `${apiUrl}&q=${city.value}&appid=${apiKey}&units=${units}`;

  axios.get(currentPositionUrl).then(currentWeather);
  axios.get(currentPositionUrl).then(cityName);
  city.value = "";
}

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", cityInput);

//functionality for the current location link
function cityName(response) {
  let city = response.data.name;
  let searchedCity = document.querySelector("#searched-city");
  searchedCity.innerHTML = city;

  let lat = response.data.coord.lat;
  let lon = response.data.coord.lon;
  let apiKey = "b1864bb25c40d16f7c3d8c9b32fea220";
  let farenheitLink = document.querySelector("#farenheit");
  if (farenheitLink.classList.contains("inactive")) {
    units = "imperial";
  } else {
    units = "metric";
  }
  let apiFiveDayUrl = "https://api.openweathermap.org/data/2.5/onecall?";
  let fiveDayUrl = `${apiFiveDayUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(fiveDayUrl).then(fiveDayForecast);
}

function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "b1864bb25c40d16f7c3d8c9b32fea220";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let farenheitLink = document.querySelector("#farenheit");
  if (farenheitLink.classList.contains("inactive")) {
    units = "imperial";
  } else {
    units = "metric";
  }
  let currentPositionUrl = `${apiUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  let apiFiveDayUrl = "https://api.openweathermap.org/data/2.5/onecall?";
  let fiveDayUrl = `${apiFiveDayUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(currentPositionUrl).then(currentWeather);
  axios.get(currentPositionUrl).then(cityName);
  axios.get(fiveDayUrl).then(fiveDayForecast);
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
  let displayCity = document.querySelector("#searched-city");
  displayCity.innerHTML = city;

  let apiKey = "b1864bb25c40d16f7c3d8c9b32fea220";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let farenheitLink = document.querySelector("#farenheit");
  if (farenheitLink.classList.contains("inactive")) {
    units = "imperial";
  } else {
    units = "metric";
  }
  let homeUrl = `${apiUrl}&q=${city}&appid=${apiKey}&units=${units}`;
  let lat = 51.51;
  let lon = -0.13;
  let apiFiveDayUrl = "https://api.openweathermap.org/data/2.5/onecall?";
  let fiveDayUrl = `${apiFiveDayUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(homeUrl).then(currentWeather);
  axios.get(fiveDayUrl).then(fiveDayForecast);
}

let resetLink = document.querySelector("#reset");
resetLink.addEventListener("click", resetHome);

//location at page load
function pageLoadLoc() {
  let city = "London";
  let displayCity = document.querySelector("#searched-city");
  displayCity.innerHTML = city;

  let apiKey = "b1864bb25c40d16f7c3d8c9b32fea220";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let farenheitLink = document.querySelector("#farenheit");
  if (farenheitLink.classList.contains("inactive")) {
    units = "imperial";
  } else {
    units = "metric";
  }
  let homeUrl = `${apiUrl}&q=${city}&appid=${apiKey}&units=${units}`;
  let lat = 51.51;
  let lon = -0.13;
  let apiFiveDayUrl = "https://api.openweathermap.org/data/2.5/onecall?";
  let fiveDayUrl = `${apiFiveDayUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(homeUrl).then(currentWeather);
  axios.get(fiveDayUrl).then(fiveDayForecast);
}

pageLoadLoc();

//five-day forecast
function fiveDayForecast(response) {
  let dayOneTemp = document.querySelector("#dayOneTemp");
  dayOneTemp.innerHTML = `${Math.round(response.data.daily[1].temp.day)}`;
  let dayTwoTemp = document.querySelector("#dayTwoTemp");
  dayTwoTemp.innerHTML = `${Math.round(response.data.daily[2].temp.day)}`;
  let dayThreeTemp = document.querySelector("#dayThreeTemp");
  dayThreeTemp.innerHTML = `${Math.round(response.data.daily[3].temp.day)}`;
  let dayFourTemp = document.querySelector("#dayFourTemp");
  dayFourTemp.innerHTML = `${Math.round(response.data.daily[4].temp.day)}`;
  let dayFiveTemp = document.querySelector("#dayFiveTemp");
  dayFiveTemp.innerHTML = `${Math.round(response.data.daily[5].temp.day)}`;

  let dayOneDay = now.getDay() + 1;
  if (dayOneDay > 6) {
    dayOneDay = now.getDay() - 6;
  }
  let dayTwoDay = now.getDay() + 2;
  if (dayTwoDay > 6) {
    dayTwoDay = now.getDay() - 5;
  }
  let dayThreeDay = now.getDay() + 3;
  if (dayThreeDay > 6) {
    dayThreeDay = now.getDay() - 4;
  }
  let dayFourDay = now.getDay() + 4;
  if (dayFourDay > 6) {
    dayFourDay = now.getDay() - 3;
  }
  let dayFiveDay = now.getDay() + 5;
  if (dayFiveDay > 6) {
    dayFiveDay = now.getDay() - 2;
  }

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let dayOneDayText = document.querySelector("#dayOneDay");
  let dayOne = days[dayOneDay];
  dayOneDayText.innerHTML = dayOne;
  let dayTwoDayText = document.querySelector("#dayTwoDay");
  let dayTwo = days[dayTwoDay];
  dayTwoDayText.innerHTML = dayTwo;
  let dayThreeDayText = document.querySelector("#dayThreeDay");
  let dayThree = days[dayThreeDay];
  dayThreeDayText.innerHTML = dayThree;
  let dayFourDayText = document.querySelector("#dayFourDay");
  let dayFour = days[dayFourDay];
  dayFourDayText.innerHTML = dayFour;
  let dayFiveDayText = document.querySelector("#dayFiveDay");
  let dayFive = days[dayFiveDay];
  dayFiveDayText.innerHTML = dayFive;

  let dayOneIcon = response.data.daily[1].weather[0].icon;
  let currentDayOneIconUrl = `http://openweathermap.org/img/wn/${dayOneIcon}@2x.png`;
  let dayOneIconImport = document.querySelector("#dayOneIcon");
  dayOneIconImport.src = `${currentDayOneIconUrl}`;
  let dayTwoIcon = response.data.daily[2].weather[0].icon;
  let currentDayTwoIconUrl = `http://openweathermap.org/img/wn/${dayTwoIcon}@2x.png`;
  let dayTwoIconImport = document.querySelector("#dayTwoIcon");
  dayTwoIconImport.src = `${currentDayTwoIconUrl}`;
  let dayThreeIcon = response.data.daily[3].weather[0].icon;
  let currentDayThreeIconUrl = `http://openweathermap.org/img/wn/${dayThreeIcon}@2x.png`;
  let dayThreeIconImport = document.querySelector("#dayThreeIcon");
  dayThreeIconImport.src = `${currentDayThreeIconUrl}`;
  let dayFourIcon = response.data.daily[4].weather[0].icon;
  let currentDayFourIconUrl = `http://openweathermap.org/img/wn/${dayFourIcon}@2x.png`;
  let dayFourIconImport = document.querySelector("#dayFourIcon");
  dayFourIconImport.src = `${currentDayFourIconUrl}`;
  let dayFiveIcon = response.data.daily[5].weather[0].icon;
  let currentDayFiveIconUrl = `http://openweathermap.org/img/wn/${dayFiveIcon}@2x.png`;
  let dayFiveIconImport = document.querySelector("#dayFiveIcon");
  dayFiveIconImport.src = `${currentDayFiveIconUrl}`;
}

function farenheitTemp(event) {
  event.preventDefault();
  let celsiusLink = document.querySelector("#celsius");
  let farenheitLink = document.querySelector("#farenheit");
  if (celsiusLink.classList.contains("inactive")) {
    farenheitLink.classList.add("inactive");
    celsiusLink.classList.remove("inactive");
  }
  let allTemps = document.querySelectorAll(".celsius-farenheit");
  allTemps.forEach(function (item) {
    let currentTemp = item.innerHTML;
    item.innerHTML = Math.round((currentTemp * 9) / 5 + 32);
  });
}

function celsiusTemp(event) {
  event.preventDefault();
  let celsiusLink = document.querySelector("#celsius");
  let farenheitLink = document.querySelector("#farenheit");
  if (farenheitLink.classList.contains("inactive")) {
    farenheitLink.classList.remove("inactive");
    celsiusLink.classList.add("inactive");
  }
  let allTemps = document.querySelectorAll(".celsius-farenheit");
  allTemps.forEach(function (item) {
    let currentTemp = item.innerHTML;
    item.innerHTML = Math.round(((currentTemp - 32) * 5) / 9);
  });
}

let windSpeed = document.querySelector(".metric-imperial");
console.log(windSpeed);

let farenheitLink = document.querySelector("#farenheit");
farenheitLink.addEventListener("click", farenheitTemp);
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", celsiusTemp);
