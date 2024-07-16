import '../css/style.css';
import createForecast from './forecast';

const locationForm = document.querySelector('form');
const location = document.querySelector('#location');

locationForm.addEventListener('submit', (e) => {
  e.preventDefault();
  fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location.value}\
    /next7days?unitGroup=us&elements=datetime%2CresolvedAddress%2Ctempmax%2Ctempmin%2Ctemp%2Cprecipprob%\
    2Cconditions%2Cdescription%2Cicon&include=fcst%2Cdays%2Ccurrent&key=8KTRXTELZJ2FLALH7ANX7K72L&contentType=json`,
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      forecast = createForecast(data);
      console.log(forecast.dailyWeather);
    });
});
let forecast = null;

console.log(forecast);
