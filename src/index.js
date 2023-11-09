let presently = new Date();
function formatDate() {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let moon = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
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
  let times = `| ${timeNow}:${minutes}`;
  presentlyDays.innerHTML = calendar;
  presentlyTimes.innerHTML = times;
}
formatDate();

function localTemperature(response) {
  let element = document.querySelector("#actual-temp");
  let locationTemp = response.data.temperature.current;
  let resultTemp = Math.round(locationTemp);
  let foundCity = document.querySelector(".city");
  let feelTemp = document.querySelector(".actual-feel");
  let realFeels = Math.round(response.data.temperature.feels_like);
  let humidLevel = document.querySelector(".humidity-level");
  let windElement = document.querySelector(".wind-speed");
  let wind = Math.round(response.data.wind.speed);
  let condition = document.querySelector("#sky-condition");
  let forecastElement = document.querySelector("#icon-element");

  element.innerHTML = `${resultTemp}°C`;
  foundCity.innerHTML = `${response.data.city}`;
  feelTemp.innerHTML = `${realFeels}°C`;
  humidLevel.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${wind}km/h`;
  condition.innerHTML = response.data.condition.description;
  forecastElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="iconForecast"
          id="icon-element" />`;

  gettingForecast(response.data.city);
}

function findingCity(event) {
  event.preventDefault();
  let citiesElement = document.querySelector("#city-selected");
  let inputCity = document.querySelector("#search-cities");
  citiesElement.innerHTML = inputCity.value;

  let apiKey = "9tce7490b0da29acf6b444190735fo2f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${inputCity.value}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(localTemperature);
}

function gettingForecast(city) {
  let apiKey = "9tce7490b0da29acf6b444190735fo2f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayingForecast);
  console.log(apiUrl);
}

function displayingForecast(response) {
  console.log(response.data);

  let theDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  theDay.forEach(function (daily) {
    forecastHtml =
      forecastHtml +
      `
<div class="weather-forecast-day">
  <div class="weather-forecast-date">${daily}</div>
  <img
    src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-night.png"
    alt=""
    width="36"
  />
  <div class="forecast-temperature">
    <span class="weather-forecast-max">18°</span>
    <span class="weather-forecast-min">12°</span>
  </div>
</div>
`;
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let inputForm = document.querySelector("#searching-forms");
inputForm.addEventListener("submit", findingCity);

function searchCity(city) {
  let apiKey = "9tce7490b0da29acf6b444190735fo2f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(localTemperature);
}
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-cities");

  searchCity(searchInput.value);
}

searchCity("Montreal");
