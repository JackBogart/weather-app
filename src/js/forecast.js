import createCurrentWeather from './currentWeather';
import createDailyWeather from './dailyWeather';
import {
  processCurrentWeather,
  processDailyWeather,
} from './processDataWrapper';

export default function createForecast(data) {
  const currentWeather = createCurrentWeather(processCurrentWeather(data));
  const dailyWeather = createDailyWeather(processDailyWeather(data));

  return { currentWeather, dailyWeather };
}
