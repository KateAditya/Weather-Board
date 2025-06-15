
import React from 'react';
import { Card } from '@/components/ui/card';
import { getWeatherIcon } from '@/utils/weatherUtils';

interface WeeklyForecastProps {
  data: any[];
}

export const WeeklyForecast = ({ data }: WeeklyForecastProps) => {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20">
      <h3 className="text-xl font-semibold text-white mb-4">7-Day Forecast</h3>
      <div className="space-y-3">
        {data.slice(0, 7).map((day, index) => {
          const date = new Date(day.dt * 1000);
          const dayName = index === 0 ? 'Today' : weekdays[date.getDay()];
          
          return (
            <div key={index} className="flex items-center justify-between py-2 border-b border-white/10 last:border-b-0">
              <div className="flex items-center gap-4 flex-1">
                <span className="text-white font-medium w-16">{dayName}</span>
                <div className="text-2xl">{getWeatherIcon(day.weather[0].icon)}</div>
                <span className="text-white/80 capitalize flex-1">{day.weather[0].description}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white/60">{Math.round(day.temp.min)}°</span>
                <span className="text-white font-semibold">{Math.round(day.temp.max)}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
