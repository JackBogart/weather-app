export default function createCurrentWeather({
  currentDatetime,
  temperature,
  conditions,
  icon,
}) {
  return {
    getCurrentDatetime: () => currentDatetime,
    getTemperature: () => Math.round(temperature),
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
