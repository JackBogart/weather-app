export default function createDailyWeather(dailyWeatherDataList) {
  return dailyWeatherDataList.map((dailyData) => ({
    getDatetime: () => dailyData.datetime,
    getMinTemperature: () => dailyData.minTemperature,
    getMaxTemperature: () => dailyData.maxTemperature,
    getPrecipitationProbability: () => dailyData.precipitationProbability,
    getConditions: () => dailyData.conditions,
    getDescription: () => dailyData.description,
    convertFahrenheitToCelsius: () => {
      dailyData.minTemperature = (dailyData.minTemperature - 32) * (5 / 9);
      dailyData.maxTemperature = (dailyData.maxTemperature - 32) * (5 / 9);
    },
    convertCelsiusToFahrenheit: () => {
      dailyData.minTemperature = (9 / 5) * dailyData.minTemperature + 32;
      dailyData.maxTemperature = (9 / 5) * dailyData.maxTemperature + 32;
    },
  }));
}
