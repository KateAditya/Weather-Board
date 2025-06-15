
import React, { useState, useEffect } from 'react';
import { WeatherHeader } from '@/components/weather/WeatherHeader';
import { CurrentWeather } from '@/components/weather/CurrentWeather';
import { WeatherMetrics } from '@/components/weather/WeatherMetrics';
import { HourlyForecast } from '@/components/weather/HourlyForecast';
import { WeeklyForecast } from '@/components/weather/WeeklyForecast';
import { WeatherMap } from '@/components/weather/WeatherMap';
import { LocationSearch } from '@/components/weather/LocationSearch';
import { useWeatherData } from '@/hooks/useWeatherData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [location, setLocation] = useState('London');
  const { data: weatherData, isLoading, error } = useWeatherData(location);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600">
      <div className="container mx-auto px-4 py-6">
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
              <WeatherMap location={location} />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default Index;
