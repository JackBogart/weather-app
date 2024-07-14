export default function createCurrentWeather({
  currentDatetime,
  temperature,
  precipitationProbability,
  conditions,
}) {
  return {
    getCurrentDatetime: () => currentDatetime,
    getTemperature: () => temperature,
    getPrecipitationProbability: () => precipitationProbability,
    getConditions: () => conditions,

    convertFahrenheitToCelsius: () => {
      temperature = (temperature - 32) * (5 / 9);
    },
    convertCelsiusToFahrenheit: () => {
      temperature = (9 / 5) * temperature + 32;
    },
  };
}
