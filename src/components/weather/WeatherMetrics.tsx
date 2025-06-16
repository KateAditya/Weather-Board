import React from 'react';
import { Card } from '@/components/ui/card';
import { getUVIndexLevel } from '@/utils/weatherUtils';

interface WeatherMetricsProps {
  data: {
    humidity: number;
    pressure: number;
    wind_speed: number;
    uvi: number;
    visibility: number;
  };
}

export const WeatherMetrics = ({ data }: WeatherMetricsProps) => {
  const { level: uvLevel, color: uvColor } = getUVIndexLevel(data.uvi);
  const visibilityKm = (data.visibility / 1000).toFixed(1);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      <Card className="p-4 bg-white/10 backdrop-blur-md border-white/20">
        <div className="flex flex-col items-center">
          <span className="text-white/60 text-sm mb-1">Humidity</span>
          <span className="text-white text-lg sm:text-xl font-semibold">{data.humidity}%</span>
        </div>
      </Card>

      <Card className="p-4 bg-white/10 backdrop-blur-md border-white/20">
        <div className="flex flex-col items-center">
          <span className="text-white/60 text-sm mb-1">Pressure</span>
          <span className="text-white text-lg sm:text-xl font-semibold">{data.pressure} hPa</span>
        </div>
      </Card>

      <Card className="p-4 bg-white/10 backdrop-blur-md border-white/20">
        <div className="flex flex-col items-center">
          <span className="text-white/60 text-sm mb-1">Wind Speed</span>
          <span className="text-white text-lg sm:text-xl font-semibold">{data.wind_speed} m/s</span>
        </div>
      </Card>

      <Card className="p-4 bg-white/10 backdrop-blur-md border-white/20">
        <div className="flex flex-col items-center">
          <span className="text-white/60 text-sm mb-1">UV Index</span>
          <span className={`text-lg sm:text-xl font-semibold ${uvColor}`}>{uvLevel}</span>
        </div>
      </Card>

      <Card className="p-4 bg-white/10 backdrop-blur-md border-white/20">
        <div className="flex flex-col items-center">
          <span className="text-white/60 text-sm mb-1">Visibility</span>
          <span className="text-white text-lg sm:text-xl font-semibold">{visibilityKm} km</span>
        </div>
      </Card>
    </div>
  );
};
