import { GoogleGenAI } from "@google/genai";
import { WeatherData } from '../types';
import { getWeatherDescription } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getOutfitRecommendation = async (
  cityName: string,
  weather: WeatherData
): Promise<string> => {
  try {
    const weatherDesc = getWeatherDescription(weather.weatherCode);
    const prompt = `
      You are a fashion advisor. Based on the following weather conditions for ${cityName}, provide a short, stylish, and practical outfit recommendation (max 30 words).
      
      Conditions:
      - Temperature: ${weather.temperature}°C
      - Weather: ${weatherDesc}
      - Humidity: ${weather.humidity}%
      - Rain Probability: ${weather.rainProbability}%
      
      Language: Traditional Chinese (繁體中文).
      Tone: Friendly, trendy.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "抱歉，目前無法取得穿搭建議，請稍後再試。";
  }
};
