let cityName = document.querySelector(".weather_area");
let dateTime = document.querySelector(".weather_dateTime");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temp = document.querySelector(".weather_temp");
let w_max = document.querySelector(".weather_max");
let w_min = document.querySelector(".weather_min");

let w_feelsLike = document.querySelector(".weather_feelsLike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");

let citySearch = document.querySelector(".searchBox");

// To get date & time
const getDateTime = (dt) => {
  const curDate = new Date(dt * 1000); // Convert seconds to milliseconds
  console.log(curDate);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);

  return formatter.format(curDate);
};

// To get the actual county name
const getCountryName = (code) => {
  return new Intl.DisplayNames(['en'], { type: 'region' }).of(code);
  // return new Intl.DisplayNames([code], { type: "region" }).of(code);
};

let city = "jamshedpur";

citySearch.addEventListener("submit" ,(e) => {
  e.preventDefault();

  let city_name = document.querySelector(".cityName");
  console.log(city_name.value);

  city = city_name.value;
  getWeatherData();
  city_name.value = "";

});

const getWeatherData = async () => {
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0a43b881b1082cef01a0c034b01ea5fa&units=metric`;
  try {
    const res = await fetch(weatherURL); //to call API
    const data = await res.json();
    // console.log(data);

    const { main, name, weather, wind, sys, dt } = data;

    cityName.innerHTML = `${name} , ${getCountryName(sys.country)}`;
    dateTime.innerHTML = getDateTime(dt);

    w_temp.innerHTML = `${main.temp.toFixed(1)}&#176;C`;
    w_min.innerHTML = `Min: ${main.temp_min.toFixed(1)}&#176;C`;
    w_max.innerHTML = `Max: ${main.temp_max.toFixed(1)}&#176;C`;

    w_feelsLike.innerHTML = `${main.feels_like.toFixed(2)}&#176`;
    w_humidity.innerHTML = `${main.humidity}%`;
    w_wind.innerHTML = `${wind.speed} m/s`;
    w_pressure.innerHTML = `${main.pressure} hPa`;

    w_forecast.innerHTML = weather[0].main;
    w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png"/>`;
  } 
  catch (error) {
    console.log(error);
  }
};
window.addEventListener("load", getWeatherData);
