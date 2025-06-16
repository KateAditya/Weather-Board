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
    <Card className="p-4 sm:p-6 bg-white/10 backdrop-blur-md border-white/20">
      <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">7-Day Forecast</h3>
      <div className="space-y-3">
        {data.map((day, index) => (
          <div key={day.dt} className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-2 border-b border-white/10 last:border-b-0 gap-4 sm:gap-8">
            <div className="flex items-center gap-2 sm:gap-4 mb-2 sm:mb-0">
              <span className="text-white font-medium w-20 sm:w-24">{getDayName(day.dt, index)}</span>
              <div className="text-xl sm:text-2xl mr-03">{getWeatherIcon(day.weather[0].icon)}</div>
              <span className="text-white/80 capitalize text-sm sm:text-base">{day.weather[0].description}</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 ml-20 sm:ml-0">
              <span className="text-blue-300 text-xs sm:text-sm gap-4">💧 {Math.round(day.pop * 100)}%</span>
              <span className="text-white/60 text-sm sm:text-base">{Math.round(day.temp.min)}°</span>
              <span className="text-white font-semibold text-sm sm:text-base">{Math.round(day.temp.max)}°</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
