let presently = new Date();
function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
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
    "December",
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

  let presentlyDays = document.querySelector("#actual-date");
  let presentlyTimes = document.querySelector("#actual-time");
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

  let apiKey = "9tce7490b0da29acf6b444190735fo2f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${inputCity.value}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(localTemperature);
  console.log(apiUrl);
}

let inputForm = document.querySelector("#searching-forms");
inputForm.addEventListener("submit", findingCity);

function localTemperature(response) {
  console.log(response.data);
  let element = document.querySelector("#actual-temp");
  let locationTemp = response.data.temperature.current;
  let resultTemp = Math.round(locationTemp);
  element.innerHTML = `${resultTemp}°C`;
  let foundCity = document.querySelector(".city");
  foundCity.innerHTML = `${response.data.city}`;
  let feelTemp = document.querySelector(".actual-feel");
  let realFeels = Math.round(response.data.temperature.feels_like);
  feelTemp.innerHTML = `${realFeels}°C`;
  let humidLevel = document.querySelector(".humidity-level");
  humidLevel.innerHTML = `${response.data.temperature.humidity}%`;
  let windElement = document.querySelector(".wind-speed");
  let wind = Math.round(response.data.wind.speed);
  windElement.innerHTML = `${wind}km/h`;
}

function gotPosition(position) {
  let long = position.data.coordinates.longitude;
  let lat = position.data.coordinates.latitude;
  let apiKey = "9tce7490b0da29acf6b444190735fo2f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${lat}&lon=${long}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(localTemperature);
}
function getCurrentPosition(events) {
  events.preventDefault();
  navigator.geolocation.getCurrentPosition();
}
let buttonLoc = document.querySelector("#locally-button");
buttonLoc.addEventListener("click", getCurrentPosition);
