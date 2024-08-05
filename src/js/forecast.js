import createCurrentWeather from './current-weather';
import createDailyWeather from './daily-weather';
import {
  processCurrentWeather,
  processDailyWeather,
} from './process-data-wrapper';

export default function createForecast(data) {
  const location = data.resolvedAddress;

  const currentWeather = createCurrentWeather(processCurrentWeather(data));
  const dailyWeather = createDailyWeather(processDailyWeather(data));

  return {
    currentWeather,
    dailyWeather,
    getLocation: () => location,
    convertCelsiusToFahrenheit: () => {
      currentWeather.convertCelsiusToFahrenheit();
      dailyWeather.forEach((daily) => {
        daily.convertCelsiusToFahrenheit();
      });
    },
    convertFahrenheitToCelsius: () => {
      currentWeather.convertFahrenheitToCelsius();
      dailyWeather.forEach((daily) => {
        daily.convertFahrenheitToCelsius();
      });
    },
  };
}
