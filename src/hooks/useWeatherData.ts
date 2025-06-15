
import { useQuery } from '@tanstack/react-query';

const API_KEY = 'c79aa811ad80bcc6f5cd789573593ae4';

interface WeatherData {
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    uvi: number;
    visibility: number;
    wind_speed: number;
    sunrise: number;
    sunset: number;
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
  };
  hourly: Array<{
    dt: number;
    temp: number;
    pop: number;
    weather: Array<{
      main: string;
      icon: string;
    }>;
  }>;
  daily: Array<{
    dt: number;
    temp: {
      min: number;
      max: number;
    };
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
  }>;
}

const fetchWeatherData = async (location: string): Promise<WeatherData> => {
  console.log('Fetching weather data for:', location);
  
  // First, get coordinates from city name
  const geocodeResponse = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(location)}&limit=1&appid=${API_KEY}`
  );
  
  if (!geocodeResponse.ok) {
    throw new Error('Failed to fetch location coordinates');
  }
  
  const geocodeData = await geocodeResponse.json();
  
  if (!geocodeData || geocodeData.length === 0) {
    throw new Error('Location not found');
  }
  
  const { lat, lon } = geocodeData[0];
  console.log('Coordinates found:', lat, lon);
  
  // Then fetch weather data using coordinates
  const weatherResponse = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&exclude=minutely,alerts`
  );
  
  if (!weatherResponse.ok) {
    throw new Error('Failed to fetch weather data');
  }
  
  const weatherData = await weatherResponse.json();
  console.log('Weather data received:', weatherData);
  
  return weatherData;
};

export const useWeatherData = (location: string) => {
  return useQuery({
    queryKey: ['weather', location],
    queryFn: () => fetchWeatherData(location),
    enabled: !!location,
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
