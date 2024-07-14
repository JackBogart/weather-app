export function processVisualCrossingCurrentWeather(data) {
  return {
    currentDatetime: data.currentConditions.datetime,
    temperature: data.currentConditions.temp,
    precipitationProbability: data.currentConditions.precipprob,
    conditions: data.currentConditions.conditions,
  };
}

export function processVisualCrossingDailyWeather(data) {
  return data.days.map((dailyData) => ({
    datetime: dailyData.datetime,
    minTemperature: dailyData.mintemp,
    maxTemperature: dailyData.maxtemp,
    precipitationProbability: dailyData.precipprob,
    conditions: dailyData.conditions,
    description: dailyData.description,
  }));
}
