export default function createCurrentWeather({
  currentDatetime,
  temperature,
  feelsLike,
  conditions,
  icon,
}) {
  return {
    getCurrentDatetime: () => currentDatetime,
    getTemperature: () => Math.round(temperature),
    getFeelsLike: () => Math.round(feelsLike),
    getConditions: () => conditions,
    getIcon: () => icon,

    convertCelsiusToFahrenheit: () => {
      temperature = (temperature - 32) * (5 / 9);
      feelsLike = (feelsLike - 32) * (5 / 9);
    },
    convertFahrenheitToCelsius: () => {
      temperature = (9 / 5) * temperature + 32;
      feelsLike = (9 / 5) * feelsLike + 32;
    },
  };
}
