import 'normalize.css';
import '../css/style.css';
import createForecast from './forecast';
import createView from './view';

const locationForm = document.querySelector('form');
const locationField = document.querySelector('#location');
const view = createView();

locationForm.addEventListener('submit', (e) => {
  e.preventDefault();
  fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationField.value}/` +
      'next7days?unitGroup=us&elements=datetime%2CresolvedAddress%2Ctempmax%2Ctempmin%2Ctemp%2Cfeelslike%2C' +
      'precipprob%2Cconditions%2Cicon&include=fcst%2Cdays%2Ccurrent&key=8KTRXTELZJ2FLALH7ANX7K72L&contentType=json',
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      forecast = createForecast(data);
      console.log(forecast.dailyWeather);
      view.displayCurrentWeather(
        forecast.currentWeather,
        forecast.getLocation(),
      );
      view.displayDailyWeather(forecast.dailyWeather);
    })
    .finally(() => console.log('Done'));
});

let forecast = null;

console.log(forecast);
