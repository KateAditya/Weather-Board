import React from 'react';
import { Card } from '@/components/ui/card';
import { getWeatherIcon } from '@/utils/weatherUtils';

interface DailyWeather {
  dt: number;
  temp: {
    min: number;
    max: number;
  };
  pop: number; // Add precipitation probability
  weather: {
    icon: string;
    description: string;
  }[];
}

interface WeeklyForecastProps {
  data: DailyWeather[];
}

export const WeeklyForecast = ({ data }: WeeklyForecastProps) => {
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const getDayName = (timestamp: number, index: number) => {
    const date = new Date(timestamp * 1000);
    if (index === 0) return 'Today';
    if (index === 1) return 'Tomorrow';
    return weekdays[date.getDay()];
  };

  return (
    <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20">
      <h3 className="text-xl font-semibold text-white mb-4">7-Day Forecast</h3>
      <div className="space-y-3">
        {data.map((day, index) => (
          <div key={day.dt} className="flex items-center justify-between py-2 border-b border-white/10 last:border-b-0">
            <div className="flex items-center gap-4 flex-1">
              <span className="text-white font-medium w-24">{getDayName(day.dt, index)}</span>
              <div className="text-2xl">{getWeatherIcon(day.weather[0].icon)}</div>
              <span className="text-white/80 capitalize flex-1">{day.weather[0].description}</span>
            </div>
            <div className="flex items-center gap-4 min-w-[140px] justify-end">
              <span className="text-blue-300 text-sm">💧 {Math.round(day.pop * 100)}%</span>
              <span className="text-white/60">{Math.round(day.temp.min)}°</span>
              <span className="text-white font-semibold">{Math.round(day.temp.max)}°</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
