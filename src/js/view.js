import { format, parse } from 'date-fns';

export default function createView() {
  function displayDailyWeather(dailyWeather) {
    const content = document.querySelector('.content');
    const dailyWeatherTitle = document.createElement('h2');
    dailyWeatherTitle.textContent = 'Weekly Forecast';
    dailyWeatherTitle.classList.add('section-title');
    const dailyWeatherContainer = document.createElement('div');

    dailyWeatherContainer.appendChild(displayDay(dailyWeather[0], 'Today'));

    for (const day of dailyWeather.slice(1)) {
      dailyWeatherContainer.appendChild(displayDay(day));
    }
    dailyWeatherContainer.classList.add('daily-weather-container', 'card');
    content.append(dailyWeatherTitle, dailyWeatherContainer);
  }

  function displayDay(day, dayOfTheWeek = null) {
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
    minTemperature.textContent = `${day.getMinTemperature()}°`;
    minTemperature.className - 'min-temp';
    const temperatureDivider = document.createElement('div');
    temperatureDivider.textContent = ' /  ';
    const maxTemperature = document.createElement('div');
    maxTemperature.textContent = `${day.getMaxTemperature()}°`;
    maxTemperature.className = 'max-temp';
    const precipitationProbability = document.createElement('div');
    precipitationProbability.textContent = `${day.getPrecipitationProbability()}%`;
    precipitationProbability.className = 'precip-prob';
    const precipitationIcon = document.createElement('div');
    precipitationIcon.className = 'precip-prob-icon';
    const precipitationWrapper = document.createElement('div');
    precipitationWrapper.classList.add('precipitation-wrapper');
    precipitationWrapper.append(precipitationIcon, precipitationProbability);
    const icon = document.createElement('div');
    icon.classList.add(day.getIcon(), 'daily-weather-icon');
    const temperatureRange = document.createElement('div');
    temperatureRange.append(maxTemperature, temperatureDivider, minTemperature);
    temperatureRange.classList.add('temp-range');
    weatherInfo.append(icon, temperatureRange, precipitationWrapper);
    dailyWeatherContainer.append(dayName, weatherInfo);
    dailyWeatherContainer.classList.add('daily-weather');
    return dailyWeatherContainer;
  }

  function displayCurrentWeather(currentWeather, location) {
    const content = document.querySelector('.content');
    const currentWeatherContainer = document.createElement('div');
    const currentWeatherTitle = document.createElement('h2');
    currentWeatherTitle.textContent = 'Today';
    currentWeatherTitle.classList.add('section-title');
    const currentWeatherConditions = document.createElement('div');
    const bottomCurrentWeatherConditions = document.createElement('div');
    const locationElement = document.createElement('div');
    locationElement.textContent = location;
    locationElement.className = 'resolved-address';
    const conditions = document.createElement('div');
    conditions.textContent = currentWeather.getConditions();
    const currentDatetime = document.createElement('div');
    currentDatetime.textContent = `As of ${convertTo12Hour(
      currentWeather.getCurrentDatetime(),
    )}`;
    currentDatetime.classList.add('current-weather-time');
    const feelsLike = document.createElement('div');
    feelsLike.textContent = `Feels like ${currentWeather.getFeelsLike()}°`;
    feelsLike.classList.add('feels-like');
    const temperature = document.createElement('div');
    temperature.textContent = `${currentWeather.getTemperature()}°`;
    const icon = document.createElement('div');
    icon.classList.add(currentWeather.getIcon(), 'current-weather-icon');
    const currentWeatherInfo = document.createElement('div');
    currentWeatherInfo.append(temperature, icon);
    currentWeatherInfo.className = 'current-weather-info';
    bottomCurrentWeatherConditions.append(feelsLike, currentDatetime);
    currentWeatherConditions.append(
      locationElement,
      conditions,
      currentWeatherInfo,
      bottomCurrentWeatherConditions,
    );
    bottomCurrentWeatherConditions.classList.add('bottom-current-weather');
    currentWeatherConditions.classList.add('current-weather', 'card');
    currentWeatherContainer.classList.add('current-weather-container');
    currentWeatherContainer.append(currentWeatherConditions);
    content.replaceChildren(currentWeatherTitle, currentWeatherContainer);
  }

  function convertTo12Hour(dateTime24) {
    const date = parse(dateTime24, 'HH:mm:ss', new Date());

    return format(date, 'h:mm a');
  }

  function convertToDayOfTheWeek(datetime) {
    const date = parse(datetime, 'yyyy-MM-dd', new Date());

    return format(date, 'iiii');
  }
  return { displayDailyWeather, displayCurrentWeather };
}
