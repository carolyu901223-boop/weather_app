import React from 'react';
import { Cloud, CloudFog, CloudRain, Sun, Snowflake, CloudLightning } from 'lucide-react';

interface WeatherIconProps {
  code: number;
  className?: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ code, className = "w-16 h-16 text-slate-700" }) => {
  if (code === 0) return <Sun className={className} />;
  if (code >= 1 && code <= 3) return <Cloud className={className} />;
  if (code >= 45 && code <= 48) return <CloudFog className={className} />;
  if (code >= 51 && code <= 67) return <CloudRain className={className} />;
  if (code >= 71 && code <= 77) return <Snowflake className={className} />;
  if (code >= 80 && code <= 82) return <CloudRain className={className} />;
  if (code >= 95) return <CloudLightning className={className} />;
  
  return <Sun className={className} />;
};

export default WeatherIcon;
