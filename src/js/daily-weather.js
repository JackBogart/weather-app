export default function createDailyWeather(dailyWeatherDataList) {
  return dailyWeatherDataList.map((dailyData) => ({
    getDatetime: () => dailyData.datetime,
    getMinTemperature: () => Math.round(dailyData.minTemperature),
    getMaxTemperature: () => Math.round(dailyData.maxTemperature),
    getPrecipitationProbability: () =>
      Math.round(dailyData.precipitationProbability),
    getIcon: () => dailyData.icon,
    convertCelsiusToFahrenheit: () => {
      dailyData.minTemperature = (dailyData.minTemperature - 32) * (5 / 9);
      dailyData.maxTemperature = (dailyData.maxTemperature - 32) * (5 / 9);
    },
    convertFahrenheitToCelsius: () => {
      dailyData.minTemperature = (9 / 5) * dailyData.minTemperature + 32;
      dailyData.maxTemperature = (9 / 5) * dailyData.maxTemperature + 32;
    },
  }));
}
