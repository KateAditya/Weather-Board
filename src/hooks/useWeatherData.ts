import { useQuery } from '@tanstack/react-query';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

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
    pop: number; // Add precipitation probability
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
  }>;
}

type ForecastListItem = {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  pop?: number;
  weather: Array<{
    main: string;
    description?: string;
    icon: string;
  }>;
};

const fetchWeatherData = async (location: string): Promise<WeatherData> => {
  console.log('Fetching weather data for:', location);

  // Using the weather API directly instead of geocoding
  const currentWeatherResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
  );

  if (!currentWeatherResponse.ok) {
    throw new Error('Failed to fetch weather data');
  }

  const currentData = await currentWeatherResponse.json();
  const { lat, lon } = currentData.coord;

  // Using 5-day forecast API with extended data
  const forecastResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&cnt=40&appid=${API_KEY}`
  );

  if (!forecastResponse.ok) {
    throw new Error('Failed to fetch forecast data');
  }

  const forecastData = await forecastResponse.json();

  // Process daily forecast data
  const dailyMap = new Map();
  const now = new Date().setHours(0, 0, 0, 0);
  let daysProcessed = 0;

  forecastData.list.forEach((item: ForecastListItem) => {
    const date = new Date(item.dt * 1000);
    const dateString = date.toDateString();
    
    if (date.getTime() >= now && daysProcessed < 7) {
      if (!dailyMap.has(dateString)) {
        dailyMap.set(dateString, {
          dt: item.dt,
          temp: {
            min: item.main.temp,
            max: item.main.temp,
          },
          pop: item.pop || 0, // Add precipitation probability
          weather: item.weather,
        });
        daysProcessed++;
      } else {
        const existing = dailyMap.get(dateString);
        existing.temp.min = Math.min(existing.temp.min, item.main.temp);
        existing.temp.max = Math.max(existing.temp.max, item.main.temp);
      }
    }
  });

  return {
    current: {
      temp: currentData.main.temp,
      feels_like: currentData.main.feels_like,
      humidity: currentData.main.humidity,
      pressure: currentData.main.pressure,
      uvi: 0,
      visibility: currentData.visibility,
      wind_speed: currentData.wind.speed,
      sunrise: currentData.sys.sunrise,
      sunset: currentData.sys.sunset,
      weather: currentData.weather,
    },
    hourly: forecastData.list.slice(0, 24).map((item: ForecastListItem) => ({
      dt: item.dt,
      temp: item.main.temp,
      pop: item.pop || 0,
      weather: item.weather,
    })),
    daily: Array.from(dailyMap.values()),
  };
};

export const useWeatherData = (location: string) => {
  return useQuery({
    queryKey: ['weather', location],
    queryFn: () => fetchWeatherData(location),
    enabled: !!location,
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });
};
