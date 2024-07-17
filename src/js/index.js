import '../css/style.css';
import createForecast from './forecast';
import { format, parse } from 'date-fns';

const locationForm = document.querySelector('form');
const locationField = document.querySelector('#location');

locationForm.addEventListener('submit', (e) => {
  e.preventDefault();
  fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationField.value}/` +
      'next7days?unitGroup=us&elements=datetime%2CresolvedAddress%2Ctempmax%2Ctempmin%2Ctemp%2Cprecipprob%' +
      '2Cconditions%2Cdescription%2Cicon&include=fcst%2Cdays%2Ccurrent&key=8KTRXTELZJ2FLALH7ANX7K72L&contentType=json',
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      forecast = createForecast(data);
      console.log(forecast.dailyWeather);
      displayLocation(forecast.getLocation());
      displayCurrentWeather(forecast.currentWeather);
      displayDailyWeather(forecast.dailyWeather);
    })
    .finally(() => console.log('Done'));
});

function displayLocation(location) {
  const content = document.querySelector('.content');
  const locationElement = document.createElement('div');
  locationElement.textContent = location;
  locationElement.className = 'resolved-address';
  content.replaceChildren(locationElement);
}

function displayCurrentWeather(currentWeather) {
  const content = document.querySelector('.content');
  const currentWeatherContainer = document.createElement('div');
  const conditions = document.createElement('div');
  conditions.textContent = currentWeather.getConditions();
  const currentDatetime = document.createElement('div');
  currentDatetime.textContent = convertTo12Hour(
    currentWeather.getCurrentDatetime(),
  );
  const temperature = document.createElement('div');
  temperature.textContent = currentWeather.getTemperature();
  const imgTest = document.createElement('div');
  imgTest.classList.add(currentWeather.getIcon(), 'current-weather-icon');
  currentWeatherContainer.append(
    imgTest,
    conditions,
    currentDatetime,
    temperature,
  );
  content.append(currentWeatherContainer);
}

function displayDailyWeather(dailyWeather) {
  displayDay(dailyWeather[0], 'Today');

  for (const day of dailyWeather.slice(1, -1)) {
    displayDay(day);
  }
}

function displayDay(day, dayOfTheWeek = null) {
  const content = document.querySelector('.content');
  const dailyWeatherContainer = document.createElement('div');
  const weatherInfo = document.createElement('div');
  weatherInfo.className = 'daily-weather-info';

  const dayName = document.createElement('div');
  dayName.textContent =
    dayOfTheWeek === null
      ? convertToDayOfTheWeek(day.getDatetime())
      : dayOfTheWeek;
  dayName.className = 'day-of-the-week';
  const minTemperature = document.createElement('div');
  minTemperature.textContent = day.getMaxTemperature();
  minTemperature.className - 'min-temp';
  const maxTemperature = document.createElement('div');
  maxTemperature.textContent = day.getMinTemperature();
  maxTemperature.className = 'max-temp';
  const precipitationProbability = document.createElement('div');
  precipitationProbability.textContent = `${day.getPrecipitationProbability()}%`;
  precipitationProbability.className = 'precip-prob';
  const icon = document.createElement('div');
  icon.classList.add(day.getIcon(), 'daily-weather-icon');
  weatherInfo.append(
    icon,
    minTemperature,
    maxTemperature,
    precipitationProbability,
  );
  dailyWeatherContainer.append(dayName, weatherInfo);
  dailyWeatherContainer.classList.add('daily-weather');
  content.append(dailyWeatherContainer);
}

function convertTo12Hour(dateTime24) {
  // Parse the 24-hour time string into a Date object
  const date = parse(dateTime24, 'HH:mm:ss', new Date());

  // Format the Date object into a 12-hour time string with AM/PM
  return format(date, 'hh:mm a');
}

function convertToDayOfTheWeek(datetime) {
  // Parse the 24-hour time string into a Date object
  const date = parse(datetime, 'yyyy-MM-dd', new Date());

  // Format the Date object into a 12-hour time string with AM/PM
  return format(date, 'iiii');
}
let forecast = null;

console.log(forecast);
