export function processVisualCrossingCurrentWeather(data) {
  return {
    currentDatetime: data.currentConditions.datetime,
    temperature: data.currentConditions.temp,
    conditions: data.currentConditions.conditions,
    icon: data.currentConditions.icon,
  };
}

export function processVisualCrossingDailyWeather(data) {
  return data.days.map((dailyData) => ({
    datetime: dailyData.datetime,
    minTemperature: dailyData.tempmin,
    maxTemperature: dailyData.tempmax,
    precipitationProbability: dailyData.precipprob,
    icon: dailyData.icon,
  }));
}
