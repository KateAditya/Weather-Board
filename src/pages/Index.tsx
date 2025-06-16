import React, { useState, useEffect, Suspense } from 'react';
import { WeatherHeader } from '@/components/weather/WeatherHeader';
import { CurrentWeather } from '@/components/weather/CurrentWeather';
import { WeatherMetrics } from '@/components/weather/WeatherMetrics';
import { HourlyForecast } from '@/components/weather/HourlyForecast';
import { WeeklyForecast } from '@/components/weather/WeeklyForecast';
import { LocationSearch } from '@/components/weather/LocationSearch';
import { useWeatherData } from '@/hooks/useWeatherData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const WeatherMap = React.lazy(() => import('@/components/weather/WeatherMap'));

const Index = () => {
  const [location, setLocation] = useState('Pune');
  const { data: weatherData, isLoading, error } = useWeatherData(location);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600">
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 max-w-5xl">
        <WeatherHeader />
        
        <LocationSearch onLocationChange={setLocation} />
        
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        )}
        
        {error && (
          <div className="text-center text-white bg-red-500/20 rounded-lg p-4 mb-6">
            <p>Error loading weather data. Please try again.</p>
          </div>
        )}
        
        {weatherData && (
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="overview">Weather Overview</TabsTrigger>
              <TabsTrigger value="map">Weather Map</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <CurrentWeather data={weatherData.current} location={location} />
              
              <WeatherMetrics data={weatherData.current} />
              
              <HourlyForecast data={weatherData.hourly} />
              
              <WeeklyForecast data={weatherData.daily} />
            </TabsContent>
            
            <TabsContent value="map">
              <Suspense fallback={<div>Loading map...</div>}>
                <WeatherMap location={location} />
              </Suspense>
            </TabsContent>
          </Tabs>
        )}
        
        {/* Copyright Footer */}
        <footer className="bg-black text-white py-6 sm:py-8 px-4 mt-8 sm:mt-12 rounded-lg">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 text-sm">

            {/* Contact Info */}
            <div className="text-center md:text-left space-y-1">
              <p>📞 +91-9545534104</p>
              <p>📧 adityakate300@gmail.com</p>
            </div>

            {/* Social Links */}
            <div className="text-center space-y-1">
              <div className="flex justify-center md:justify-start gap-4">
                <a
                  href="https://github.com/KateAditya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition"
                >
                  🔗 GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/aditya-kate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition"
                >
                  🔗 LinkedIn
                </a>
              </div>
              <p className="text-gray-400">Portfolio: Coming Soon</p>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-center text-white opacity-70 mt-6 text-xs">
            © 2025 Made by <span className="font-semibold">AK_2003</span> ❤️
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;



