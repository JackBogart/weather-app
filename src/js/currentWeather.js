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

    convertFahrenheitToCelsius: () => {
      temperature = (temperature - 32) * (5 / 9);
    },
    convertCelsiusToFahrenheit: () => {
      temperature = (9 / 5) * temperature + 32;
    },
  };
}
