import {
  processVisualCrossingCurrentWeather,
  processVisualCrossingDailyWeather,
} from './visualCrossingProcessor';

export function processCurrentWeather(data) {
  return processVisualCrossingCurrentWeather(data);
}

export function processDailyWeather(data) {
  return processVisualCrossingDailyWeather(data);
}
