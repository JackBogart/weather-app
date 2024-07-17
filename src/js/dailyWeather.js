export default function createDailyWeather(dailyWeatherDataList) {
  return dailyWeatherDataList.map((dailyData) => ({
    getDatetime: () => dailyData.datetime,
    getMinTemperature: () => Math.round(dailyData.minTemperature),
    getMaxTemperature: () => Math.round(dailyData.maxTemperature),
    getPrecipitationProbability: () =>
      Math.round(dailyData.precipitationProbability),
    getIcon: () => dailyData.icon,

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
