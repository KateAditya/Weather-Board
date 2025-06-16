
import React from 'react';
import { Card } from '@/components/ui/card';
import { getWeatherIcon } from '@/utils/weatherUtils';

interface WeatherData {
  temp: number;
  feels_like: number;
  weather: {
    description: string;
    icon: string;
  }[];
}

interface CurrentWeatherProps {
  data: WeatherData;
  location: string;
}

export const CurrentWeather = ({ data, location }: CurrentWeatherProps) => {
  const temperature = Math.round(data.temp);
  const feelsLike = Math.round(data.feels_like);
  const description = data.weather[0].description;
  const iconCode = data.weather[0].icon;

  return (
    <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white mb-2">{location}</h2>
          <div className="flex items-center gap-4">
            <span className="text-6xl font-bold text-white">{temperature}°</span>
            <div className="text-4xl">{getWeatherIcon(iconCode)}</div>
          </div>
          <p className="text-white/80 capitalize text-lg mt-2">{description}</p>
          <p className="text-white/60 mt-1">Feels like {feelsLike}°</p>
        </div>
      </div>
    </Card>
  );
};
