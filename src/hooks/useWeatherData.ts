
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

// Mock weather data for demo purposes
const mockWeatherData = {
  current: {
    temp: 22,
    feels_like: 24,
    humidity: 65,
    pressure: 1013,
    uvi: 5,
    visibility: 10000,
    wind_speed: 3.5,
    sunrise: 1703145600,
    sunset: 1703181600,
    weather: [
      {
        main: 'Clear',
        description: 'clear sky',
        icon: '01d'
      }
    ]
  },
  hourly: Array.from({ length: 48 }, (_, i) => ({
    dt: Date.now() / 1000 + i * 3600,
    temp: 22 + Math.sin(i / 4) * 8,
    pop: Math.random() * 0.3,
    weather: [
      {
        main: i % 3 === 0 ? 'Rain' : 'Clear',
        icon: i % 3 === 0 ? '10d' : '01d'
      }
    ]
  })),
  daily: Array.from({ length: 7 }, (_, i) => ({
    dt: Date.now() / 1000 + i * 86400,
    temp: {
      min: 15 + Math.random() * 5,
      max: 25 + Math.random() * 8
    },
    weather: [
      {
        main: i % 2 === 0 ? 'Sunny' : 'Cloudy',
        description: i % 2 === 0 ? 'sunny' : 'partly cloudy',
        icon: i % 2 === 0 ? '01d' : '02d'
      }
    ]
  }))
};

export const useWeatherData = (location: string) => {
  return useQuery({
    queryKey: ['weather', location],
    queryFn: async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would make an API call here
      // const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?q=${location}&appid=${API_KEY}&units=metric`);
      // return response.json();
      
      return mockWeatherData;
    },
  });
};
