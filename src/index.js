let presently = new Date();
function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let moon = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let date = presently.getDate();
  let year = presently.getFullYear();
  let timeNow = presently.getHours();
  if (timeNow < 10) {
    timeNow = `0${timeNow}`;
  }

  let minutes = presently.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let presentlyDays = document.querySelector("#current-date");
  let presentlyTimes = document.querySelector("#current-time");
  let calendar = `${days[presently.getDay()]}, ${date} ${
    moon[presently.getMonth()]
  } ${year}`;
  let times = `Local Time ${timeNow}:${minutes}`;
  presentlyDays.innerHTML = calendar;
  presentlyTimes.innerHTML = times;
}
formatDate();

function findingCity(event) {
  event.preventDefault();
  let citiesElement = document.querySelector("#city-selected");
  let inputCity = document.querySelector("#search-cities");
  citiesElement.innerHTML = inputCity.value;

  let apiKey = "25fad9f7e87157d33dde0f82ab269ee8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(localTemperature);
}

let inputForm = document.querySelector("#searching-forms");
inputForm.addEventListener("submit", findingCity);

function localTemperature(response) {
  let element = document.querySelector("#actual-temp");
  let locationTemp = Math.round(response.data.main.temp);
  let resultTemp = `${locationTemp}°C`;
  element.innerHTML = resultTemp;
  let foundCity = document.querySelector(".city");
  foundCity.innerHTML = `${response.data.name}`;
  let maxTemp = document.querySelector(".maximum-temp");
  maxTemp.innerHTML = Math.round(response.data.main.temp_max);
  let miniTemp = document.querySelector(".minimum-temp");
  miniTemp.innerHTML = Math.round(response.data.main.temp_min);
  let humidLevel = document.querySelector(".humidity-level");
  humidLevel.innerHTML = `${response.data.main.humidity}% 💧`;
}

function gotPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let units = "metric";
  let endPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "25fad9f7e87157d33dde0f82ab269ee8";
  let apiUrl = `${endPoint}?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(localTemperature);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(gotPosition);
}
let buttonLoc = document.querySelector("#locally");
buttonLoc.addEventListener("click", getCurrentPosition);
