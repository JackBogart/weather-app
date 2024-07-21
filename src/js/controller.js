import createForecast from './forecast';
import createView from './view';

export default function createController() {
  const locationForm = document.querySelector('form');
  const locationField = document.querySelector('#location');
  const temperatureSelector = document.querySelector('#temperature-scale');
  const view = createView();
  let forecast = null;

  function loadWeather(data) {
    forecast = createForecast(data);
    view.displayCurrentWeather(forecast.currentWeather, forecast.getLocation());
    view.displayDailyWeather(forecast.dailyWeather);
    locationForm.reset();
  }

  async function fetchWeather(searchQuery, unitGroup) {
    view.displayLoading();

    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchQuery}/` +
          `next7days?unitGroup=${unitGroup}&elements=datetime%2CresolvedAddress%2Ctempmax%2Ctempmin%2Ctemp%2Cfeelslike%2C` +
          'precipprob%2Cconditions%2Cicon&include=fcst%2Cdays%2Ccurrent&key=8KTRXTELZJ2FLALH7ANX7K72L&contentType=json',
      );
      if (!response.ok) {
        throw new Error('Invalid Location');
      }

      const data = await response.json();
      loadWeather(data);
    } catch (error) {
      forecast = null;

      if (error.message === 'Invalid Location') {
        view.displayNoLocationFound(searchQuery);
      } else {
        console.log(error);
      }
    }
  }

  function setupSearchHandler() {
    locationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let unitGroup = temperatureSelector.value === 'fahrenheit' ? 'us' : 'uk';
      fetchWeather(locationField.value, unitGroup);
    });
  }

  function setupTemperatureConverter() {
    temperatureSelector.addEventListener('change', () => {
      if (forecast === null) return;

      if (temperatureSelector.value === 'fahrenheit') {
        forecast.convertFahrenheitToCelsius();
      } else {
        forecast.convertCelsiusToFahrenheit();
      }

      view.displayCurrentWeather(
        forecast.currentWeather,
        forecast.getLocation(),
      );
      view.displayDailyWeather(forecast.dailyWeather);
    });
  }

  function init() {
    setupSearchHandler();
    setupTemperatureConverter();
  }

  return { init };
}
