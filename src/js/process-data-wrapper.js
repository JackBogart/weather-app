import {
  processVisualCrossingCurrentWeather,
  processVisualCrossingDailyWeather,
} from './visual-crossing-processor';

export function processCurrentWeather(data) {
  return processVisualCrossingCurrentWeather(data);
}

export function processDailyWeather(data) {
  return processVisualCrossingDailyWeather(data);
}
