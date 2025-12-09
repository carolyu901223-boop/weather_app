export interface City {
  name: string;
  lat: number;
  lng: number;
  imageUrl: string; // Placeholder or Unsplash URL
}

export interface WeatherData {
  temperature: number;
  weatherCode: number;
  humidity: number;
  rainProbability: number;
  sunset: string; // Formatted HH:MM
}

export interface OutfitResponse {
  advice: string;
}

// Open-Meteo API Response Types
export interface OpenMeteoResponse {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    weather_code: number;
  };
  daily: {
    sunset: string[];
    precipitation_probability_max: number[];
  };
}
