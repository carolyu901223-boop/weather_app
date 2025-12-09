import { OpenMeteoResponse, WeatherData } from '../types';

export const fetchWeatherData = async (lat: number, lng: number): Promise<WeatherData> => {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,weather_code&daily=sunset,precipitation_probability_max&timezone=auto&forecast_days=1`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data: OpenMeteoResponse = await response.json();

    // Process Sunset Time (ISO 8601 -> HH:MM)
    const rawSunset = data.daily.sunset[0];
    const sunsetDate = new Date(rawSunset);
    const formattedSunset = sunsetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    return {
      temperature: Math.round(data.current.temperature_2m),
      humidity: data.current.relative_humidity_2m,
      weatherCode: data.current.weather_code,
      rainProbability: data.daily.precipitation_probability_max[0],
      sunset: formattedSunset
    };
  } catch (error) {
    console.error("Weather API Error:", error);
    throw error;
  }
};
