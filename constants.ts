import { City } from './types';

// Pre-defined cities as per the "Alternative" spec to avoid complex geocoding
export const CITIES: City[] = [
  {
    name: "Taipei City",
    lat: 25.03,
    lng: 121.56,
    imageUrl: "https://images.unsplash.com/photo-1595133379227-646f966144e0?q=80&w=1000&auto=format&fit=crop"
  },
  {
    name: "New York",
    lat: 40.71,
    lng: -74.01,
    imageUrl: "https://images.unsplash.com/photo-1496442226666-8d4a0e62e6e9?q=80&w=1000&auto=format&fit=crop"
  },
  {
    name: "London",
    lat: 51.51,
    lng: -0.13,
    imageUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1000&auto=format&fit=crop"
  },
  {
    name: "Tokyo",
    lat: 35.69,
    lng: 139.69,
    imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1000&auto=format&fit=crop"
  },
  {
    name: "Paris",
    lat: 48.85,
    lng: 2.35,
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000&auto=format&fit=crop"
  },
  {
    name: "Sydney",
    lat: -33.87,
    lng: 151.21,
    imageUrl: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1000&auto=format&fit=crop"
  }
];

// Helper to map WMO Weather Codes to readable descriptions/types
export const getWeatherDescription = (code: number): string => {
  if (code === 0) return "Clear Sky";
  if (code >= 1 && code <= 3) return "Partly Cloudy";
  if (code >= 45 && code <= 48) return "Foggy";
  if (code >= 51 && code <= 67) return "Rainy";
  if (code >= 71 && code <= 77) return "Snowy";
  if (code >= 80 && code <= 82) return "Heavy Rain";
  if (code >= 95) return "Thunderstorm";
  return "Unknown";
};
