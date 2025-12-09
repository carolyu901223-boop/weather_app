import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { ChevronDown, Droplets, Umbrella, Sunset, Sparkles, X } from 'lucide-react';
import { CITIES } from './constants';
import { fetchWeatherData } from './services/weatherService';
import { getOutfitRecommendation } from './services/geminiService';
import { City, WeatherData } from './types';
import WeatherIcon from './components/WeatherIcon';

const App: React.FC = () => {
  // State
  const [selectedCity, setSelectedCity] = useState<City>(CITIES[0]); // Default to Taipei
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [outfitAdvice, setOutfitAdvice] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  // Fetch Weather when city changes
  useEffect(() => {
    const loadWeather = async () => {
      setLoading(true);
      setOutfitAdvice(null); // Reset advice on city change
      try {
        const data = await fetchWeatherData(selectedCity.lat, selectedCity.lng);
        setWeather(data);
      } catch (err) {
        console.error("Failed to load weather", err);
      } finally {
        setLoading(false);
      }
    };
    loadWeather();
  }, [selectedCity]);

  // Handle Dropdown Change
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const city = CITIES.find(c => c.name === e.target.value);
    if (city) {
      setSelectedCity(city);
    }
  };

  // Handle AI Advice Request
  const handleGetAdvice = async () => {
    if (!weather) return;
    
    setAiLoading(true);
    setShowModal(true); // Open modal immediately to show loading state
    
    try {
      const advice = await getOutfitRecommendation(selectedCity.name, weather);
      setOutfitAdvice(advice);
    } catch (err) {
      setOutfitAdvice("抱歉，目前無法取得建議。");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-rose-50 to-orange-100 flex items-center justify-center p-4">
      {/* Glassmorphism Card Container */}
      <div className="w-full max-w-[400px] bg-white/40 backdrop-blur-xl border border-white/60 shadow-2xl rounded-[40px] overflow-hidden flex flex-col relative">
        
        {/* 1. Header Section */}
        <header className="pt-6 pb-2 text-center">
          <h1 className="text-xl font-bold tracking-wider text-slate-800 uppercase">Weather</h1>
        </header>

        {/* 2. City Selection Section */}
        <div className="px-8 py-2 relative">
          <div className="relative">
            <select 
              value={selectedCity.name}
              onChange={handleCityChange}
              className="w-full appearance-none bg-white/50 border border-white/60 text-slate-700 font-medium py-3 px-4 rounded-2xl outline-none focus:ring-2 focus:ring-orange-300/50 cursor-pointer shadow-sm transition-all hover:bg-white/70"
            >
              {CITIES.map(city => (
                <option key={city.name} value={city.name}>{city.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5 pointer-events-none" />
          </div>
        </div>

        {/* Loading State for Weather */}
        {loading ? (
          <div className="flex-1 flex items-center justify-center min-h-[400px]">
            <div className="animate-pulse text-slate-400 font-medium">Loading Forecast...</div>
          </div>
        ) : weather ? (
          <>
            {/* 3. Main Weather Info Section */}
            <div className="flex items-center justify-between px-8 py-6">
              {/* Left: Icon Box */}
              <div className="w-32 h-32 bg-slate-200/50 rounded-3xl flex flex-col items-center justify-center shadow-inner backdrop-blur-sm">
                <WeatherIcon code={weather.weatherCode} className="w-16 h-16 text-slate-700 mb-2" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Icon</span>
              </div>
              
              {/* Right: Info */}
              <div className="flex flex-col items-end">
                <span className="text-slate-600 font-medium mb-1">{selectedCity.name}</span>
                <div className="text-7xl font-bold text-slate-800 tracking-tighter">
                  {weather.temperature}<span className="text-4xl align-top">°</span>
                </div>
              </div>
            </div>

            {/* 4. Detailed Metrics Section */}
            <div className="px-8 py-2">
              <div className="flex justify-between items-start divide-x divide-slate-300/50">
                {/* Rain Chance */}
                <div className="flex-1 flex flex-col items-center text-center px-1">
                  <div className="w-10 h-10 rounded-full bg-blue-100/50 flex items-center justify-center mb-2 shadow-sm">
                    <Umbrella className="w-5 h-5 text-blue-500" />
                  </div>
                  <span className="text-xs text-slate-500 font-medium mb-1">降雨機率</span>
                  <span className="text-lg font-bold text-slate-700">{weather.rainProbability}%</span>
                </div>

                {/* Humidity */}
                <div className="flex-1 flex flex-col items-center text-center px-1">
                  <div className="w-10 h-10 rounded-full bg-teal-100/50 flex items-center justify-center mb-2 shadow-sm">
                    <Droplets className="w-5 h-5 text-teal-500" />
                  </div>
                  <span className="text-xs text-slate-500 font-medium mb-1">濕度</span>
                  <span className="text-lg font-bold text-slate-700">{weather.humidity}%</span>
                </div>

                {/* Sunset */}
                <div className="flex-1 flex flex-col items-center text-center px-1">
                  <div className="w-10 h-10 rounded-full bg-orange-100/50 flex items-center justify-center mb-2 shadow-sm">
                    <Sunset className="w-5 h-5 text-orange-500" />
                  </div>
                  <span className="text-xs text-slate-500 font-medium mb-1">日落時間</span>
                  <span className="text-lg font-bold text-slate-700">{weather.sunset}</span>
                </div>
              </div>
            </div>

            {/* 5. City Image Section */}
            <div className="px-6 py-6 flex-1">
              <div className="w-full h-64 relative rounded-[32px] overflow-hidden shadow-lg group">
                <img 
                  src={selectedCity.imageUrl} 
                  alt={selectedCity.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end justify-center p-6">
                  <h2 className="text-white font-bold text-2xl drop-shadow-md">{selectedCity.name}</h2>
                </div>
              </div>
            </div>

            {/* 6. AI Feature (Footer) */}
            <div className="px-6 pb-8">
              <button 
                onClick={handleGetAdvice}
                className="w-full py-4 bg-slate-800 hover:bg-slate-900 text-white rounded-[24px] font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all active:scale-95"
              >
                <Sparkles className="w-5 h-5 text-yellow-300" />
                本日穿搭建議
              </button>
            </div>
          </>
        ) : null}

        {/* Modal for AI Recommendation */}
        {showModal && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center animate-in fade-in duration-200">
            <div className="bg-white/90 backdrop-blur-xl w-full sm:w-[90%] m-4 rounded-[32px] p-6 shadow-2xl animate-in slide-in-from-bottom duration-300 border border-white/50">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                   <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
                     <Sparkles className="w-4 h-4 text-white" />
                   </div>
                   <h3 className="font-bold text-lg text-slate-800">AI Stylist</h3>
                </div>
                <button onClick={() => setShowModal(false)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              
              <div className="min-h-[100px] flex items-center justify-center">
                {aiLoading ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm text-slate-500 animate-pulse">Generating outfit...</p>
                  </div>
                ) : (
                  <p className="text-slate-700 text-lg leading-relaxed font-medium text-center">
                    "{outfitAdvice}"
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default App;
